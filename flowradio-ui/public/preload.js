/**
 * Electron Preload Script
 * 提供安全的 IPC 通信接口
 */

const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的 API 到渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 示例：发送消息到主进程
  send: (channel, data) => {
    const validChannels = ['user-message', 'app-command'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  // 接收主进程消息
  receive: (channel, callback) => {
    const validChannels = ['ai-response', 'system-notification'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },

  // 获取平台信息
  platform: process.platform,
  
  // 应用版本
  version: '1.0.0'
});

console.log('[Preload] Context bridge established');
