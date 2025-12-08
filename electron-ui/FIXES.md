# FlowRadio UI 修复说明

## 已修复的问题

### 1. ✅ 重复声明错误
**问题**：`Uncaught SyntaxError: Identifier 'handleLyriaResponse' has already been declared`

**原因**：`renderer.js` 中 `handleLyriaResponse` 函数被定义了两次（第 95 行和第 324 行）

**修复**：删除了第 324 行的重复定义

---

### 2. ✅ 模块加载错误
**问题**：`index.html` 中使用 `<script type="module">`，但 `renderer.js` 使用了 CommonJS 的 `require()`

**原因**：ES6 模块和 CommonJS 不兼容

**修复**：将 `<script type="module" src="renderer.js">` 改回 `<script src="renderer.js">`，并使用动态 `import()` 加载 ES6 模块

---

### 3. ✅ CSS 语法错误
**问题**：`style.css` 第一行是 `cd*` 而不是 `*`

**修复**：已修正为 `*`

---

## 当前状态

### 已实现的功能
- ✅ 俄罗斯方块动态背景
- ✅ 音乐节奏分析（Web Audio API）
- ✅ 背景与音乐同步
- ✅ 模块化背景管理器
- ✅ Live2D 容器预留

### 文件结构
```
electron-ui/
├── backgrounds/
│   ├── manager.js       # 背景管理器
│   └── tetris.js        # 俄罗斯方块背景
├── live2d-config.js     # Live2D 配置（占位符）
├── index.html           # 主页面
├── style.css            # 样式
├── renderer.js          # 主逻辑
└── BACKGROUND_README.md # 文档
```

---

## 如何启动

### 方法 1：使用 start.ps1（推荐）
```powershell
.\start.ps1
```

这将依次启动：
1. Lyria Service (Python)
2. Go Backend (WebSocket)
3. Electron UI

### 方法 2：手动启动
```powershell
# 终端 1: 启动 Lyria Service
conda activate base
python lyria_service.py

# 终端 2: 启动 Go Backend
cd backend
go run .

# 终端 3: 启动 Electron UI
cd electron-ui
npm start
```

---

## 验证背景是否工作

启动后你应该看到：
1. **黑色背景**：带有下落的彩色俄罗斯方块
2. **透明 UI 层**：标题栏、状态栏、聊天区域
3. **控制台日志**：
   ```
   ✅ 动态背景已初始化
   ✅ 俄罗斯方块背景已初始化
   ✅ Web Audio Context 已初始化
   ```

### 音乐节奏同步测试
1. 连接到后端（等待绿点显示 "已连接"）
2. 发送消息（如 "我想听摇滚"）
3. 等待音乐开始播放
4. 观察方块速度和透明度随音乐节奏变化

---

## 已知问题

### 1. 背景初始化可能失败
**症状**：控制台显示 `❌ 背景初始化失败`

**解决方案**：
- 检查 `backgrounds/manager.js` 和 `backgrounds/tetris.js` 是否存在
- 打开 DevTools 查看详细错误信息

### 2. WebSocket 连接失败
**症状**：状态栏显示 "未连接"，红点闪烁

**原因**：Go 后端未启动或端口被占用

**解决方案**：
```powershell
# 检查后端是否运行
netstat -ano | findstr :8080

# 手动启动后端
cd backend
go run .
```

### 3. 音频无声音
**症状**：背景动画不随音乐变化

**原因**：音频分析器未正确连接

**解决方案**：
- 检查控制台是否有 `✅ Web Audio Context 已初始化` 消息
- 确保浏览器允许自动播放音频

---

## 下一步开发

### 短期（本周）
- [ ] 完善俄罗斯方块视觉效果（粒子、光晕）
- [ ] 集成 Live2D 主持人模型
- [ ] 添加背景切换按钮

### 中期（下周）
- [ ] 实现节奏光剑背景
- [ ] 优化音乐节奏分析算法
- [ ] Live2D 动作与音乐同步

### 长期
- [ ] 支持自定义背景参数
- [ ] 录制功能（导出视频）
- [ ] 多主题支持

---

## 调试技巧

### 查看控制台日志
1. 打开 DevTools: `Ctrl + Shift + I`
2. 切换到 Console 标签
3. 查找带有表情符号的日志：
   - ✅ 成功消息
   - ❌ 错误消息
   - 🎵 音频相关
   - 🎭 Live2D 相关

### 测试背景管理器
在控制台中运行：
```javascript
// 获取当前背景类型
backgroundManager.getCurrentType() // 应返回 'tetris'

// 手动更新音乐强度
backgroundManager.updateWithMusic(0.8) // 0-1 之间的值

// 销毁背景
backgroundManager.destroy()

// 重新初始化
const { BackgroundManager } = await import('./backgrounds/manager.js');
backgroundManager = new BackgroundManager('dynamic-background');
await backgroundManager.init('tetris');
```

---

## 常见问题

**Q: 为什么我看不到俄罗斯方块？**
A: 检查：
1. `#dynamic-background` 容器是否存在（F12 → Elements）
2. 控制台是否有初始化成功的消息
3. CSS 样式是否正确加载（`z-index: 0`）

**Q: 背景不随音乐变化？**
A: 检查：
1. 音频是否正在播放
2. `musicIntensityInterval` 是否启动（控制台应该没有报错）
3. `analyser` 是否正确连接

**Q: 如何切换到其他背景？**
A: 目前只实现了俄罗斯方块，未来可以通过 `backgroundManager.switchBackground('beatSaber')` 切换

---

## 联系与反馈

如有问题，请检查：
1. 控制台日志（DevTools → Console）
2. 网络请求（DevTools → Network）
3. WebSocket 状态（DevTools → Network → WS）

祝使用愉快！🎵
