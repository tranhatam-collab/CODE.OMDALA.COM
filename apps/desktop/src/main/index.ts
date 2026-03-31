import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { existsSync, readdirSync, statSync } from 'fs';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// IPC: Open folder dialog
ipcMain.handle('dialog:openFolder', async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openDirectory'],
    title: 'Open Project Folder',
  });
  return result.canceled ? null : result.filePaths[0];
});

// IPC: Check if path is a git repo
ipcMain.handle('fs:isGitRepo', async (_event, folderPath: string) => {
  return existsSync(join(folderPath, '.git'));
});

// IPC: List directory contents
ipcMain.handle('fs:listDir', async (_event, folderPath: string) => {
  try {
    const entries = readdirSync(folderPath, { withFileTypes: true });
    return entries
      .filter(e => !e.name.startsWith('.') || e.name === '.git')
      .map(e => ({ name: e.name, isDirectory: e.isDirectory(), path: join(folderPath, e.name) }));
  } catch {
    return [];
  }
});

// IPC: Read file content
ipcMain.handle('fs:readFile', async (_event, filePath: string) => {
  try {
    const { readFileSync } = await import('fs');
    return readFileSync(filePath, 'utf-8');
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Failed to read file' };
  }
});

// IPC: Get app version
ipcMain.handle('app:getVersion', () => app.getVersion());

// IPC: Get platform info
ipcMain.handle('app:getPlatform', () => ({
  platform: process.platform,
  arch: process.arch,
  nodeVersion: process.versions.node,
  electronVersion: process.versions.electron,
}));
