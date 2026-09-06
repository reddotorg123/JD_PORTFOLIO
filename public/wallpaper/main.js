const { app, BrowserWindow, screen, Tray, Menu, nativeImage, ipcMain, powerMonitor } = require('electron');
const path = require('path');
const os = require('os');

let mainWindow = null;
let tray = null;
let metricsInterval = null;

// App settings
const config = {
  theme: 'obsidian',
  powerProfile: 'balanced', // 'turbo' (60fps), 'balanced' (30fps), 'eco' (15fps)
  cleanView: false
};

// --- CPU Usage Sampler (Delta Calculation) ---
let prevCpus = os.cpus();

function getCpuUsage() {
  const currentCpus = os.cpus();
  let idleDiff = 0;
  let totalDiff = 0;

  for (let i = 0; i < currentCpus.length; i++) {
    const prev = prevCpus[i].times;
    const curr = currentCpus[i].times;

    const prevTotal = prev.user + prev.nice + prev.sys + prev.idle + prev.irq;
    const currTotal = curr.user + curr.nice + curr.sys + curr.idle + curr.irq;

    idleDiff += curr.idle - prev.idle;
    totalDiff += currTotal - prevTotal;
  }

  prevCpus = currentCpus;
  if (totalDiff === 0) return 5;
  const usage = Math.round((1 - idleDiff / totalDiff) * 100);
  return Math.min(100, Math.max(1, usage));
}

function sampleSystemMetrics() {
  const cpuLoad = getCpuUsage();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memUsagePercent = Math.round((usedMem / totalMem) * 100);
  const usedMemGB = (usedMem / (1024 * 1024 * 1024)).toFixed(1);
  const totalMemGB = (totalMem / (1024 * 1024 * 1024)).toFixed(0);

  const procMem = process.memoryUsage();
  const appMemMB = Math.round(procMem.heapUsed / (1024 * 1024));

  const healthScore = Math.max(50, Math.min(100, 100 - Math.round(cpuLoad * 0.4) - Math.round((memUsagePercent - 40) * 0.3)));

  const metrics = {
    cpuLoad,
    cpuModel: os.cpus()[0]?.model || 'Multi-Core Processor',
    cpuCores: os.cpus().length,
    usedMemGB,
    totalMemGB,
    memUsagePercent,
    appMemMB,
    healthScore,
    uptimeSec: Math.floor(os.uptime()),
    platform: `${os.type()} ${os.arch()}`
  };

  if (tray) {
    tray.setToolTip(`REDDOT Enterprise Workstation OS\nCPU: ${cpuLoad}% | RAM: ${usedMemGB}GB/${totalMemGB}GB (${memUsagePercent}%)\nApp RAM: ${appMemMB}MB | Health: ${healthScore}%`);
  }

  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('system-metrics-update', metrics);
  }
}

function createWallpaperWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.bounds;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    type: 'desktop', // Windows desktop background layer
    frame: false,
    show: false,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: false,
    focusable: true, // Enables typing and interactive admin inputs
    backgroundColor: '#060609',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      backgroundThrottling: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'wallpaper-ui', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.setBounds({ x: 0, y: 0, width, height });
    sampleSystemMetrics();
    metricsInterval = setInterval(sampleSystemMetrics, 1200);
  });

  mainWindow.on('closed', () => {
    if (metricsInterval) clearInterval(metricsInterval);
    mainWindow = null;
  });
}

function createTrayIcon() {
  const iconPath = path.join(__dirname, 'wallpaper-ui', 'assets', 'id-card.png');
  let icon = nativeImage.createFromPath(iconPath);
  if (icon.isEmpty()) {
    icon = nativeImage.createEmpty();
  }
  icon = icon.resize({ width: 16, height: 16 });

  tray = new Tray(icon);
  tray.setToolTip('REDDOT Enterprise Workstation OS');

  updateTrayMenu();
}

function updateTrayMenu() {
  const themes = [
    { label: 'Obsidian Cyber (Cyan)', id: 'obsidian' },
    { label: 'Nordic Slate (Silver)', id: 'nordic' },
    { label: 'Soft Emerald (Green)', id: 'emerald' },
    { label: 'Crimson REDDOT (Red)', id: 'crimson' },
    { label: 'Sunset Amber (Gold)', id: 'amber' },
    { label: 'Deep Nebula (Violet)', id: 'nebula' }
  ];

  const contextMenu = Menu.buildFromTemplate([
    { label: '♦ REDDOT Executive Workstation OS', enabled: false },
    { type: 'separator' },
    {
      label: '👥 Worker & ID Management',
      click: () => {
        mainWindow?.webContents.send('open-tab', 'workers');
        mainWindow?.focus();
      }
    },
    {
      label: '⏱️ Work Hours & Timesheets',
      click: () => {
        mainWindow?.webContents.send('open-tab', 'timesheets');
        mainWindow?.focus();
      }
    },
    {
      label: '📋 Task Allocation Center',
      click: () => {
        mainWindow?.webContents.send('open-tab', 'tasks');
        mainWindow?.focus();
      }
    },
    {
      label: '💬 Private Group Chat & DMs',
      click: () => {
        mainWindow?.webContents.send('open-tab', 'chat');
        mainWindow?.focus();
      }
    },
    {
      label: '📞 Voice & Video Calling Hub',
      click: () => {
        mainWindow?.webContents.send('open-tab', 'calls');
        mainWindow?.focus();
      }
    },
    { type: 'separator' },
    {
      label: '🎨 Color Themes',
      submenu: themes.map(t => ({
        label: t.label,
        type: 'radio',
        checked: config.theme === t.id,
        click: () => {
          config.theme = t.id;
          mainWindow?.webContents.send('set-theme', t.id);
        }
      }))
    },
    {
      label: '⚡ 1-Click RAM Turbo Clean',
      click: () => {
        if (global.gc) global.gc();
        mainWindow?.webContents.send('trigger-memory-clean');
        sampleSystemMetrics();
      }
    },
    {
      label: '🖥️ Minimal Wallpaper View',
      click: () => {
        mainWindow?.webContents.send('toggle-clean');
      }
    },
    {
      label: '⚙️ Workstation Preferences',
      click: () => {
        mainWindow?.webContents.send('open-settings');
      }
    },
    { type: 'separator' },
    {
      label: '🚪 Exit Workstation',
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
}

// IPC Handlers
ipcMain.on('request-memory-clean', () => {
  if (global.gc) global.gc();
  sampleSystemMetrics();
});

// Single instance lock
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    createWallpaperWindow();
    createTrayIcon();

    powerMonitor.on('lock-screen', () => {
      mainWindow?.webContents.send('set-power-profile', 'eco');
    });

    powerMonitor.on('suspend', () => {
      mainWindow?.webContents.send('set-power-profile', 'eco');
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}
