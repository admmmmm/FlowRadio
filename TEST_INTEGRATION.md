# 生产环境集成测试

## ✅ 已完成的改进

### 1. Panel控制架构统一 (Single Source of Truth)

**位置**: `live2d/src/main.js`

```javascript
// 全局变量 - 唯一真相源
let globalPanel = null;
let globalEnablePanel = true;

// 统一接口
export function setEnablePanel(enable)
export function togglePanel()
export function getPanelState()
```

**使用流程**:
```javascript
// flowradio.html
import { setEnablePanel, togglePanel, getPanelState } from '/src/main.js';

// 1. 初始化前设置
setEnablePanel(true);

// 2. 初始化
await initLive2dWithDialogue({ ... });

// 3. 切换Panel
togglePanel();  // 返回新的visible状态

// 4. 查询状态
getPanelState();  // { created: true, visible: false, enablePanel: true }
```

### 2. PostMessage通信统一

**Live2D → FlowRadio UI**:
- `live2d-ready`: iframe加载完成
- `live2d-say-result`: 气泡显示结果 (success, result/error)
- `panel-toggled`: Panel切换完成 (visible, state)

**FlowRadio UI → Live2D**:
- `live2d-say`: 触发气泡显示
- `toggle-panel`: 切换Panel

### 3. 关键修改点

#### `live2d/src/main.js`
- ✅ 添加全局Panel控制变量和函数
- ✅ 在initLive2d中保存globalPanel引用
- ✅ 暴露togglePanel和getPanelState到controller

#### `live2d/src/dialog-api.js`
- ✅ 透传所有options参数到initLive2d

#### `live2d/flowradio.html`
- ✅ 设置`window.LIVE2D_AUTO_INIT = false`禁用自动初始化
- ✅ 调用`setEnablePanel(true)`设置全局状态
- ✅ 使用`togglePanel()`统一接口切换Panel
- ✅ postMessage监听器调用统一接口

#### `flowradio-ui/src/renderer.js`
- ✅ postMessage监听器接收`visible`和`state`参数
- ✅ 自动更新设置面板按钮文本
- ✅ Panel切换按钮移除本地状态,完全依赖iframe返回

#### `flowradio-ui/public/index.html`
- 需要更新: iframe端口 5173 → 5174

## 🧪 测试步骤

### 测试1: 独立测试页面

**访问**: http://localhost:5174/test-bubble.html

**预期**:
1. 页面加载,显示控制面板
2. 日志显示: "✅ 初始化成功!"
3. 日志显示: "Panel状态: {"created":true,"visible":false,"enablePanel":true}"
4. 点击"📢 显示气泡": 气泡出现,日志显示成功
5. 点击"🎛️ 切换Panel": Panel出现/消失,日志显示状态变化

### 测试2: FlowRadio集成测试

**步骤**:
1. 启动所有服务: `.\start.ps1`
2. 打开 Electron 窗口
3. 点击设置按钮 (右上角齿轮)
4. 切换到"Live2D面板"标签
5. 点击"开启 Panel"按钮

**预期**:
- iframe内Panel出现
- 按钮文本变为"关闭 Panel"
- TopBar显示提示: "🎭 Panel 已开启"

### 测试3: 气泡显示测试

**步骤**:
1. 在聊天框输入消息
2. 发送到后端(通过WebSocket)
3. 后端返回HOST_MESSAGE

**预期**:
- Live2D角色头顶出现气泡
- 气泡显示文本内容
- 控制台显示: "[Live2D] ✅ 气泡显示成功"

## 📝 当前待修复

### 高优先级
- [ ] 更新index.html中iframe端口: 5173 → 5174
- [ ] 测试完整启动流程 (start.ps1)
- [ ] 验证WebSocket → HOST_MESSAGE → 气泡流程

### 中优先级
- [ ] 清理不再使用的Live2dController.js
- [ ] 更新文档说明新的架构

### 低优先级
- [ ] 优化Panel默认显示位置
- [ ] 添加Panel可拖拽功能

## 🎯 下一步行动

1. **立即修复**: 更新iframe端口到5174
2. **启动测试**: 运行start.ps1
3. **验证功能**: 
   - Panel切换
   - 气泡显示
   - 设置面板交互
4. **完整流程**: 用户输入 → WebSocket → Coze API → 气泡显示
