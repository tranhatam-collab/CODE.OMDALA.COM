import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openFolder: () => ipcRenderer.invoke('dialog:openFolder'),
  isGitRepo: (path: string) => ipcRenderer.invoke('fs:isGitRepo', path),
  listDir: (path: string) => ipcRenderer.invoke('fs:listDir', path),
  readFile: (path: string) => ipcRenderer.invoke('fs:readFile', path),
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
  getPlatform: () => ipcRenderer.invoke('app:getPlatform'),
});
