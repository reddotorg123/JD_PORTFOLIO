const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onThemeChange: (callback) => ipcRenderer.on('set-theme', (_event, theme) => callback(theme)),
  onModeChange: (callback) => ipcRenderer.on('set-mode', (_event, mode) => callback(mode)),
  onOpenTab: (callback) => ipcRenderer.on('open-tab', (_event, tab) => callback(tab)),
  onPowerProfileChange: (callback) => ipcRenderer.on('set-power-profile', (_event, profile) => callback(profile)),
  onCleanToggle: (callback) => ipcRenderer.on('toggle-clean', (_event) => callback()),
  onOpenSettings: (callback) => ipcRenderer.on('open-settings', (_event) => callback()),
  onSystemMetricsUpdate: (callback) => ipcRenderer.on('system-metrics-update', (_event, data) => callback(data)),
  onTriggerMemoryClean: (callback) => ipcRenderer.on('trigger-memory-clean', (_event) => callback()),
  requestMemoryClean: () => ipcRenderer.send('request-memory-clean')
});
