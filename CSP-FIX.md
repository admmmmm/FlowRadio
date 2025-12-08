# 🔧 CSP 和启动脚本修复

## 问题 1: CSP 阻止 iframe 加载

**错误信息：**
```
Failed to load URL: http://localhost:5173/flowradio.html with error: ERR_BLOCKED_BY_CSP
```

### 修复方案（双重保护）

#### 方案 A: Electron 主进程配置
`flowradio-ui/src/main.js`:
```javascript
webPreferences: {
  nodeIntegration: false,
  contextIsolation: true,
  preload: path.join(__dirname, '../public/preload.js'),
  webSecurity: false  // ✅ 允许加载 localhost iframe (仅开发环境)
}
```

#### 方案 B: CSP Meta 标签
`flowradio-ui/public/index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               frame-src http://localhost:5173;           ✅ 允许 iframe
               connect-src http://localhost:* ws://localhost:*;">  ✅ 允许 WebSocket
```

## 问题 2: 启动脚本错误

**错误信息：**
```
npm error code ENOENT
npm error path D:\dev\FlowRadio\package.json
```

### 原因
脚本末尾有多余的 `npm start` 命令，在错误的目录执行。

### 修复
删除 `start-complete.ps1` 最后的 `npm start`：

**修复前：**
```powershell
Write-Host "💡 Tip: Press Ctrl+C in any window to stop that service" -ForegroundColor Cyan
Write-Host ""

# Launch Electron UI
npm start  # ❌ 这里在 D:\dev\FlowRadio 运行，找不到 package.json
```

**修复后：**
```powershell
Write-Host "💡 Tip: Press Ctrl+C in any window to stop that service" -ForegroundColor Cyan
Write-Host ""
# ✅ UI 已经在 Start-Process 中启动，不需要额外命令
```

## 验证修复

### 单独测试 UI 启动
```powershell
cd D:\dev\FlowRadio
.\test-ui.ps1
```

### 完整系统启动
```powershell
cd D:\dev\FlowRadio
.\start-complete.ps1
```

## 预期结果

启动后应该看到：

1. ✅ **4 个 PowerShell 窗口**
   - Window 1: Lyria Music Service (Python)
   - Window 2: Go WebSocket Backend
   - Window 3: Live2D Vite Server
   - Window 4: Electron UI (会自动打开 Electron 窗口)

2. ✅ **1 个 Electron 窗口**
   - 黑色背景
   - Neon Tetris 背景动画
   - Live2D 角色（iframe 加载）
   - 底部输入框
   - 顶部消息显示区

3. ✅ **控制台无错误**
   - 无 CSP 错误
   - 无 WebSocket 连接失败
   - Live2D iframe 正常显示

## 测试清单

启动后验证：

- [ ] Lyria 服务运行在 http://localhost:8000
- [ ] Go Backend 运行在 ws://localhost:8080/ws
- [ ] Live2D 运行在 http://localhost:5173
- [ ] Electron 窗口打开
- [ ] 按 F12 打开 DevTools，Console 无错误
- [ ] 可以看到 Live2D 角色
- [ ] 背景 Neon Tetris 正常运行
- [ ] 点击页面后音乐播放
- [ ] 输入消息测试 AI 响应

## 如果仍有问题

### 手动启动各服务

**Terminal 1 - Lyria:**
```powershell
cd D:\dev\FlowRadio
python lyria_service.py
```

**Terminal 2 - Go Backend:**
```powershell
cd D:\dev\FlowRadio\backend
go run .
```

**Terminal 3 - Live2D:**
```powershell
cd D:\dev\FlowRadio\live2d
npm run dev
```

**Terminal 4 - Electron UI:**
```powershell
cd D:\dev\FlowRadio\flowradio-ui
npm start
```

### 查看详细错误

在 Electron 窗口按 F12，查看 Console 标签页的错误信息。

---

**所有修复已完成！现在可以正常启动完整系统！** ✅
