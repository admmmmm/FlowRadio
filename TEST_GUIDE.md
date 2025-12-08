# FlowRadio 测试指南

## 问题分析

### 当前架构混乱点:

1. **两个初始化函数**:
   - `initLive2d()` - 基础初始化 (在 `src/main.js`)
   - `initLive2dWithDialogue()` - 对话API包装 (在 `src/dialog-api.js`,内部调用`initLive2d`)

2. **enablePanel参数传递**:
   ```
   flowradio.html → initLive2dWithDialogue(enablePanel: false)
                  → initLive2d(enablePanel: false)
                  → 创建或不创建Panel组件
   ```

3. **main.js的自动初始化**:
   - `window.LIVE2D_AUTO_INIT !== false` 时会自动调用 `initLive2d()`
   - 可能导致重复初始化

## 测试步骤

### 第一步: 测试独立Live2D页面

1. 启动Vite服务:
   ```powershell
   cd D:\dev\FlowRadio\live2d
   npm run dev
   ```

2. 浏览器访问: `http://localhost:5173/test-bubble.html`

3. 测试功能:
   - ✅ 看到2个Live2D角色 (hiyori + mao)
   - ✅ 点击"📢 显示气泡"按钮,应该看到角色头顶出现对话框
   - ✅ 点击"🎛️ 切换Panel"按钮,应该看到调试面板出现/消失
   - ✅ 观察左上角日志,确认所有操作成功

### 第二步: 测试postMessage集成

1. Vite服务保持运行

2. 用浏览器打开: `D:\dev\FlowRadio\flowradio-ui\public\test-integration.html`
   (直接用浏览器打开,不需要Electron)

3. 测试功能:
   - ✅ 看到iframe中加载了Live2D
   - ✅ 左侧控制面板输入文本,点击"📢 显示气泡"
   - ✅ 观察日志:
     - `📤 发送消息到Live2D`
     - `📨 收到消息: live2d-say`
     - `✅ 气泡显示成功`

### 第三步: 整合到FlowRadio主程序

**成功后**,将工作代码整合:

1. 修改 `flowradio-ui/public/index.html`:
   ```html
   <iframe id="live2d-frame" src="http://localhost:5173/test-bubble.html"></iframe>
   ```

2. 在 `renderer.js` 中使用相同的postMessage模式

## 关键配置对比

### test-bubble.html (✅ 推荐配置)

```javascript
await initLive2dWithDialogue({
  canvasId: 'canvas',
  characterConfigs: [...],
  persist: true,
  enablePanel: true  // ← 创建Panel (之后可以切换显示)
});
```

### flowradio.html (❌ 当前配置)

```javascript
await initLive2dWithDialogue({
  canvasId: 'canvas',
  characterConfigs: [...],
  persist: true,
  enablePanel: false  // ← 不创建Panel (无法后续显示)
});
```

## enablePanel 详解

### enablePanel: true
- ✅ 创建Live2DPanel组件
- ✅ 初始可见或隐藏由Panel组件决定
- ✅ 可通过 `panel.visible = true/false` 切换
- ✅ 右下角"Panel: OFF"按钮有效

### enablePanel: false
- ❌ 不创建Panel组件
- ❌ 后续无法显示Panel
- ❌ `panel.visible` 无效 (panel为null)
- ❌ 右下角按钮无效

## 预期测试结果

### ✅ 成功标志:

1. **test-bubble.html**:
   - Console显示: `[Live2D] ✅ 初始化成功!`
   - 点击"显示气泡"后,角色头顶出现白色对话框
   - 文字逐字滚动显示
   - 3秒后对话框消失

2. **test-integration.html**:
   - 左侧日志显示: `✅ Live2D iframe已就绪`
   - 发送消息后显示: `✅ 气泡显示成功`
   - iframe中角色显示气泡

### ❌ 失败情况排查:

1. **角色不显示**:
   - 检查Console错误
   - 确认模型路径: `/live2d/hiyori/hiyori_pro_t11.model3.json`

2. **气泡不显示**:
   - 检查enablePanel是否为true
   - 检查Console中say函数返回值
   - 检查是否有`bubble.container.visible = true`日志

3. **postMessage不工作**:
   - F12 → Console → 搜索"📨"或"📤"
   - 检查iframe src是否正确
   - 检查是否有CORS错误

## 下一步

测试通过后,我们可以:
1. 删除 `flowradio.html` (已被test-bubble.html替代)
2. 简化架构,只保留一个Live2D入口
3. 更新 `flowradio-ui/public/index.html` 使用测试通过的配置
