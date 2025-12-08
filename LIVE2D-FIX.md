# 🔧 Live2D 启动问题修复说明

## 问题原因

`live2d/package.json` 缺少 `scripts` 字段，导致 `npm run dev` 命令找不到。

## 已修复的文件

### 1. `live2d/package.json`
添加了完整的 package.json 结构：

```json
{
  "name": "flowradio-live2d",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",           // ✅ 新增
    "build": "vite build",   // ✅ 新增
    "preview": "vite preview" // ✅ 新增
  },
  "dependencies": {
    "@pixi/events": "^7.4.0",
    "pixi-live2d-display-lipsyncpatch": "^0.5.0-ls-8",
    "vite": "^7.2.6"
  }
}
```

### 2. `live2d/vite.config.js`
更新为完整的 Vite 配置：

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    host: true,
    open: false
  },
  assetsInclude: ['**/*.wasm'],
  optimizeDeps: {
    exclude: ['@pixi/live2d-display']
  },
  build: {
    outDir: 'dist'
  }
})
```

### 3. `start-complete.ps1`
修复了目录切换问题：

**修改前：**
```powershell
cd "$PSScriptRoot\live2d"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\live2d'; npm run dev"
```

**修改后：**
```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\live2d'; npm run dev"
```

使用 `Set-Location` 代替 `cd` 确保在新的 PowerShell 进程中正确切换目录。

## 验证修复

测试 Live2D 服务单独启动：

```powershell
cd D:\dev\FlowRadio\live2d
npm run dev
```

**预期输出：**
```
  VITE v7.2.6  ready in 356 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
  ➜  press h + enter to show help
```

## 现在可以正常启动了！

```powershell
cd D:\dev\FlowRadio
.\start-complete.ps1
```

所有 4 个服务将按顺序启动：
1. ✅ Lyria Music Service (端口 8000)
2. ✅ Go WebSocket Backend (端口 8080)
3. ✅ Live2D Service (端口 5173) - **已修复**
4. ✅ FlowRadio UI (Electron)

## 故障排除

### 如果 Live2D 仍然无法启动

1. **删除 node_modules 重新安装：**
   ```powershell
   cd D:\dev\FlowRadio\live2d
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

2. **检查 Vite 版本：**
   ```powershell
   npm list vite
   ```

3. **手动测试 Vite：**
   ```powershell
   cd D:\dev\FlowRadio\live2d
   npx vite
   ```

### 如果启动脚本卡住

检查哪个服务启动失败：

```powershell
# 检查端口占用
netstat -ano | findstr "8000"  # Lyria
netstat -ano | findstr "8080"  # Go Backend
netstat -ano | findstr "5173"  # Live2D
```

### 查看详细日志

在各服务的 PowerShell 窗口中查看输出信息。

---

**修复完成！现在可以直接运行 `.\start-complete.ps1` 启动完整系统！** ✅
