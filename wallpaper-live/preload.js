const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onMetricsUpdate: (callback) => ipcRenderer.on('system-metrics-update', (_event, value) => callback(value)),
  onOpenTab: (callback) => ipcRenderer.on('open-tab', (_event, tab) => callback(tab)),
  onToggleClean: (callback) => ipcRenderer.on('toggle-clean', () => callback()),
  onSetTheme: (callback) => ipcRenderer.on('set-theme', (_event, theme) => callback(theme)),
  onAutoStartChanged: (callback) => ipcRenderer.on('auto-start-changed', (_event, status) => callback(status)),
  requestMemoryClean: () => ipcRenderer.send('request-memory-clean'),
  getAutoStart: () => ipcRenderer.invoke('get-auto-start'),
  setAutoStart: (enable) => ipcRenderer.invoke('set-auto-start', enable)
});
