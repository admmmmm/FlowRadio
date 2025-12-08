/**
 * Electron 主进程
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow = null;

console.log('[Main] ========== ELECTRON MAIN PROCESS ==========');
console.log('[Main] Electron version:', process.versions.electron);
console.log('[Main] Node version:', process.versions.node);
console.log('[Main] Chrome version:', process.versions.chrome);

function createWindow() {
  console.log('[Main] Creating window...');
  
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 1280,
    minHeight: 720,
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: true,       // 启用 Node 集成
      contextIsolation: false,      // 禁用上下文隔离（开发环境）
      webSecurity: false  // 允许加载 localhost iframe (仅开发环境)
    },
    frame: true,
    title: 'FlowRadio - AI DJ',
    icon: path.join(__dirname, '../public/icon.png') // 可选图标
  });

  console.log('[Main] Window configuration:', {
    size: '1600x900',
    nodeIntegration: true,
    contextIsolation: false,
    webSecurity: false
  });

  // 加载 HTML
  const htmlPath = path.join(__dirname, '../public/index.html');
  console.log('[Main] Loading HTML from:', htmlPath);
  mainWindow.loadFile(htmlPath);

  // 开发模式下打开 DevTools
  const isDev = process.argv.includes('--dev');
  console.log('[Main] Dev mode:', isDev);
  if (isDev) {
    mainWindow.webContents.openDevTools();
    console.log('[Main] DevTools opened');
  }

  // 监听页面加载事件
  mainWindow.webContents.on('did-start-loading', () => {
    console.log('[Main] Page started loading...');
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('[Main] ✓ Page finished loading');
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('[Main] ❌ Page failed to load!');
    console.error('[Main] Error code:', errorCode);
    console.error('[Main] Error description:', errorDescription);
  });

  // 监听控制台消息
  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    const levels = ['LOG', 'WARNING', 'ERROR'];
    console.log(`[Renderer Console ${levels[level]}] ${message}`);
  });

  mainWindow.on('closed', () => {
    console.log('[Main] Window closed');
    mainWindow = null;
  });

  console.log('[Main] ✓ Window created successfully');
}

app.whenReady().then(() => {
  console.log('[Main] App ready event fired');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      console.log('[Main] Activate: creating new window');
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  console.log('[Main] All windows closed');
  if (process.platform !== 'darwin') {
    console.log('[Main] Quitting app');
    app.quit();
  }
});

console.log('[Main] Electron app started, waiting for ready event...');
