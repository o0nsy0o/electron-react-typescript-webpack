import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import url from 'url';
import Store from 'electron-store';
import { getModule } from './getModule';

const store = new Store();

let mainWindow: Electron.BrowserWindow | null;
app.allowRendererProcessReuse = true;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
      devTools: process.env.NODE_ENV === 'production' ? false : true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => { mainWindow = null; });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit(); }
});

app.on('activate', () => {
  if (mainWindow === null) { createWindow(); }
});

ipcMain.handle('get-default-path', async () => {
  const p = store.get('path');
  if (p) { return await getModule(p); }
  return [];
});

ipcMain.handle('walk', async () => {
  const tPath = await dialog.showOpenDialog({ properties: ['openDirectory'], message: '请选择目标文件夹' });
  store.delete('path');
  store.set('path', tPath.filePaths[0]);
  return await getModule(tPath.filePaths[0]);
});
