// 加载环境变量 (必须在最前面)
require('dotenv').config({ path: __dirname + '/.env' });

// 禁用 Electron 安全警告 (开发环境需要 webSecurity: false)
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    backgroundColor: '#1a1a2e',
    titleBarStyle: 'hidden',
    frame: false,
    fullscreen: true // 默认全屏
  });

  mainWindow.loadFile('index.html');
  
  // 自动打开开发者工具 (调试用) - 已禁用
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createDebugWindow() {
  if (debugWindow) {
    debugWindow.focus();
    return;
  }

  debugWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    backgroundColor: '#0a0e27',
    titleBarStyle: 'hidden',
    frame: false,
    parent: mainWindow
  });

  debugWindow.loadFile('debug.html');

  if (process.argv.includes('--dev')) {
    debugWindow.webContents.openDevTools();
  }

  debugWindow.on('closed', () => {
    debugWindow = null;
  });
}

// 监听来自渲染进程的调试面板请求
const { ipcMain } = require('electron');
ipcMain.on('open-debug-panel', () => {
  createDebugWindow();
});

// 系统控制 IPC
ipcMain.on('system-relaunch', () => {
  app.relaunch();
  app.exit(0);
});

ipcMain.on('system-quit', () => {
  app.quit();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
