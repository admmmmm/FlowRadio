# 🚀 FlowRadio 启动指南（确保无 Bug）

## 方法 1: 自动启动（推荐）

使用带状态检查的启动脚本：

```powershell
cd D:\dev\FlowRadio
.\start-all.ps1
```

**脚本会自动：**
- ✅ 检查环境变量
- ✅ 依次启动 4 个服务
- ✅ 等待每个服务端口就绪后再启动下一个
- ✅ 显示最终服务状态
- ❌ 如果某服务失败，会提示并询问是否继续

---

## 方法 2: 手动启动（调试用）

按顺序在 **4 个独立的 PowerShell 窗口** 中执行：

### Terminal 1 - Lyria Music Service
```powershell
cd D:\dev\FlowRadio
python lyria_service.py
```
**等待看到：** `Running on http://127.0.0.1:8000`

---

### Terminal 2 - Go WebSocket Backend
```powershell
cd D:\dev\FlowRadio\backend
go run .
```
**等待看到：** `WebSocket server started on :8080`

---

### Terminal 3 - Live2D Service
```powershell
cd D:\dev\FlowRadio\live2d
npm run dev
```
**等待看到：**
```
VITE v7.2.6  ready in 356 ms
➜  Local:   http://localhost:5173/
```

---

### Terminal 4 - FlowRadio UI
```powershell
cd D:\dev\FlowRadio\flowradio-ui
npm start
```
**等待看到：** Electron 窗口打开

---

## 验证清单

启动完成后，检查以下内容：

### 1. 服务端口检查
```powershell
# 在新的 PowerShell 窗口执行
netstat -ano | findstr "8000"  # Lyria
netstat -ano | findstr "8080"  # Go Backend
netstat -ano | findstr "5173"  # Live2D
```
**应该看到 3 个 LISTENING 状态**

### 2. Live2D 页面访问
```powershell
start http://localhost:5173/flowradio.html
```
**应该看到：** 浏览器打开，显示 Hiyori 和 Mao 两个角色

### 3. Electron UI 检查
- [ ] Electron 窗口已打开
- [ ] 背景有 Neon Tetris 动画
- [ ] 右侧可以看到 Live2D 角色（iframe）
- [ ] 底部有输入框
- [ ] 顶部有消息显示区

### 4. DevTools 检查（F12）
按 F12 打开 DevTools，Console 标签页应该：
- [ ] 无红色错误
- [ ] 看到 `[Renderer] Initializing...`
- [ ] 看到 `[Background] Tetris background initialized`
- [ ] 看到 `[Audio] AudioAnalyzer initialized`
- [ ] **如果有 WebSocket 连接，会看到：** `[WebSocket] Connected`

---

## 常见问题修复

### 问题 1: Live2D 无法启动（端口 5173）

**错误：** `npm error Missing script: "dev"`

**修复：**
```powershell
cd D:\dev\FlowRadio\live2d

# 检查 package.json
cat package.json

# 应该包含：
# "scripts": {
#   "dev": "vite",
#   ...
# }

# 如果没有，重新安装
Remove-Item -Recurse -Force node_modules
npm install
```

### 问题 2: Electron 报 CSP 错误

**错误：** `Failed to load URL: ... ERR_BLOCKED_BY_CSP`

**已修复文件：**
- `flowradio-ui/src/main.js` - 已添加 `webSecurity: false`
- `flowradio-ui/public/index.html` - 已添加 `frame-src http://localhost:5173`

### 问题 3: Electron 报连接被拒绝

**错误：** `ERR_CONNECTION_REFUSED`

**原因：** Live2D 服务（端口 5173）未启动

**修复：**
1. 先手动启动 Live2D：
   ```powershell
   cd D:\dev\FlowRadio\live2d
   npm run dev
   ```
2. 等待看到 `ready in XXX ms`
3. 再启动 Electron UI

### 问题 4: 环境变量缺失

**错误：** `Missing GEMINI_API_KEY`

**修复：**
```powershell
# 创建 .env 文件
cd D:\dev\FlowRadio
Copy-Item .env.example .env

# 编辑 .env，填入真实的 API Key
notepad .env
```

---

## 推荐启动顺序（重要！）

必须按以下顺序启动，确保依赖服务先就绪：

```
1. Lyria (8000)        ← 音乐生成服务
        ↓
2. Go Backend (8080)   ← WebSocket 服务器
        ↓
3. Live2D (5173)       ← 角色渲染服务 ⭐ 必须在 UI 之前启动
        ↓
4. Electron UI         ← 依赖上面 3 个服务
```

**❌ 如果先启动 UI，再启动 Live2D：**
- Electron 会尝试加载 `http://localhost:5173/flowradio.html`
- 因为 5173 端口未监听，会报 `ERR_CONNECTION_REFUSED`
- 需要重启 Electron UI

---

## 快速测试

### 只测试 Live2D
```powershell
cd D:\dev\FlowRadio\live2d
npm run dev
# 然后浏览器打开 http://localhost:5173/flowradio.html
```

### 只测试 Electron UI（假设 Live2D 已启动）
```powershell
cd D:\dev\FlowRadio\flowradio-ui
npm start
```

---

## 完整启动命令（复制粘贴版）

```powershell
# 1. 启动所有服务（自动化脚本）
cd D:\dev\FlowRadio
.\start-all.ps1

# 2. 或者手动启动（分别在 4 个窗口）
# Window 1:
cd D:\dev\FlowRadio; python lyria_service.py

# Window 2:
cd D:\dev\FlowRadio\backend; go run .

# Window 3:
cd D:\dev\FlowRadio\live2d; npm run dev

# Window 4 (等待 Window 3 的 Vite 启动完成):
cd D:\dev\FlowRadio\flowradio-ui; npm start
```

---

**按照以上步骤启动，可以确保无 Bug！** ✅

如果仍有问题，请检查各服务窗口的错误信息，并在 Electron 窗口按 F12 查看 Console。
