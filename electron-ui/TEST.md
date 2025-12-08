# 快速测试指南

## ✅ 已修复的模块加载问题

**问题**：`Failed to resolve module specifier "pixi.js"`

**原因**：在 Electron + CommonJS 环境中使用了 ES6 的 `import` 语法

**修复**：
- 将 `backgrounds/tetris.js` 改为使用 `const PIXI = require('pixi.js')`
- 将 `backgrounds/manager.js` 改为使用 `const { TetrisBackground } = require('./tetris.js')`
- 将 `renderer.js` 中的动态 `import()` 改为 `require()`
- 添加 `module.exports` 导出

---

## 🧪 测试步骤

### 1. 启动应用
```powershell
cd electron-ui
npm start
```

### 2. 检查控制台（按 Ctrl + Shift + I）
应该看到以下成功消息：
```
🚀 FlowRadio Electron UI 启动
✅ 动态背景已初始化
✅ 俄罗斯方块背景已初始化
🔌 正在连接 WebSocket...
```

### 3. 验证背景
- 打开 DevTools → Elements
- 检查 `#dynamic-background` 是否包含 `<canvas>` 元素
- 背景应该是黑色，带有彩色方块在下落

### 4. 测试音乐同步
1. 确保后端正在运行：
   ```powershell
   # 新终端
   cd backend
   go run .
   ```

2. 在 UI 中发送消息："我想听音乐"

3. 等待音乐开始播放，观察方块速度变化

---

## 🐛 如果仍有问题

### 控制台测试命令
在 DevTools Console 中运行：

```javascript
// 1. 检查 backgroundManager 是否存在
console.log(backgroundManager);

// 2. 检查容器
console.log(document.getElementById('dynamic-background'));

// 3. 手动测试音乐强度
if (backgroundManager) {
  backgroundManager.updateWithMusic(0.9); // 高强度
  setTimeout(() => backgroundManager.updateWithMusic(0.1), 2000); // 2秒后低强度
}

// 4. 检查 Pixi.js 是否加载
console.log(require('pixi.js'));
```

---

## 📊 预期效果

### 正常状态
- ✅ 黑色背景
- ✅ 彩色俄罗斯方块不断下落
- ✅ 方块有随机旋转和水平漂移
- ✅ 每60帧生成一组新方块

### 音乐播放时
- ✅ 方块速度随音乐节奏加快
- ✅ 高强度时方块更透明、速度更快
- ✅ 低强度时恢复正常速度

---

## 🎯 下一步

如果背景工作正常，可以：
1. 调整参数（在 `renderer.js` 第 750 行）：
   ```javascript
   blockSize: 30,      // 方块大小
   baseSpeed: 2,       // 基础速度
   spawnInterval: 60,  // 生成间隔（帧）
   ```

2. 开始集成 Live2D

3. 添加更多背景效果

---

## 常见问题

**Q: 看不到方块？**
A: 
- 检查 `#dynamic-background` 的 `z-index` 是否为 0
- 打开 DevTools → Elements，检查 canvas 是否存在
- 查看控制台是否有初始化错误

**Q: 方块不动？**
A:
- 检查控制台是否有 Pixi.js 错误
- 尝试刷新页面（Ctrl + R）

**Q: 前后端连不上？**
A:
- 确保 Go 后端在运行：`cd backend && go run .`
- 检查端口 8080 是否被占用：`netstat -ano | findstr :8080`
