# FlowRadio 开发指南

> **面向新手的完整代码修改指南** - 告诉你在哪里、怎么修改代码

---

## 📋 目录

1. [项目架构概览](#项目架构概览)
2. [核心组件说明](#核心组件说明)
3. [常见修改场景](#常见修改场景)
4. [代码修改位置速查表](#代码修改位置速查表)
5. [调试指南](#调试指南)
6. [常见问题排查](#常见问题排查)

---

## 项目架构概览

```
FlowRadio/
├── live2d/                    # Live2D角色渲染服务 (Vite + PixiJS)
│   ├── src/
│   │   ├── main.js           # ⭐ 核心初始化 + Panel控制
│   │   ├── dialog-api.js     # ⭐ 气泡对话系统
│   │   ├── panel-dev.js      # Panel开发工具
│   │   ├── character-manager.js  # 角色管理
│   │   ├── action.js         # 动作控制
│   │   └── mapping.js        # 自然语言映射
│   └── flowradio.html        # ⭐ Electron iframe入口页面
│
├── flowradio-ui/              # Electron主程序
│   ├── public/
│   │   └── index.html        # ⭐ 主窗口HTML (嵌入Live2D iframe)
│   ├── src/
│   │   └── renderer.js       # ⭐ 主进程逻辑 + WebSocket + postMessage
│   └── main.js               # Electron启动入口
│
└── backend/                   # Go后端 (WebSocket服务器)
    └── main.go               # Coze API集成 + 消息转发
```

---

## 核心组件说明

### 1️⃣ Live2D 角色系统 (`live2d/`)

#### **`src/main.js`** - 核心初始化和Panel控制

**作用**: Live2D的大脑,负责创建角色、管理Panel、暴露控制接口
$
**关键代码位置**:

```javascript
// 📍 第95-125行: 全局Panel控制系统
let globalPanel = null;           // Panel组件实例
let globalEnablePanel = true;     // 是否启用Panel

export function togglePanel() {
  if (!globalPanel) return false;
  globalPanel.visible = !globalPanel.visible;
  return globalPanel.visible;
}

export function getPanelState() {
  return {
    created: !!globalPanel,
    visible: globalPanel?.visible || false
  };
}

// 📍 第130-210行: initLive2d() - 初始化函数
export async function initLive2d({
  canvasId,
  characterConfigs,
  enablePanel = true,  // ⚠️ 必须显式传递
  // ...
}) {
  // ...
  // 📍 第212-215行: 创建Panel
  if (enablePanel) {
    globalPanel = createPanelDev(manager);
  }
}
```

**修改指南**:

- **添加新角色**: 修改`defaultCharacterConfigs`数组 (第15-30行)
- **调整角色位置/大小**: 修改`position`和`scale`参数
- **禁用Panel**: 将`enablePanel`设为`false`

---

#### **`src/dialog-api.js`** - 气泡对话系统

**作用**: 包装`say()`函数,让角色显示对话气泡和播放语音

**关键代码位置**:

```javascript
// 📍 第50-100行: say() 函数
export async function say({
  id,              // 角色ID: 'hiyori' 或 'mao'
  text,            // 显示的文字
  audioUrl = null, // TTS音频URL
  motion = '说话', // 动作名称
  expression = null,
  crossOrigin = 'anonymous',
  charsPerSec = 8,  // 文字显示速度
  fontSize = 18,    // 字体大小
  maxLines = 3,     // 最大行数
  maxCharsPerLine = 14  // 每行最大字符数
}) {
  const character = manager.get(id);
  // ...
  await character.actions.say(text, audioOptions, bubbleOptions);
}
```

**修改指南**:

- **调整气泡样式**: 修改`bubbleOptions` (字体、行数、字符数)
- **调整语音速度**: 修改`audioOptions.charsPerSec`
- **更换动作**: 修改`motion`参数 (可选: '说话', '挥手', 等)

---

#### **`flowradio.html`** - Electron iframe入口

**作用**: 被Electron嵌入的页面,初始化Live2D并监听父窗口的postMessage

**关键代码位置**:

```javascript
// 📍 第44行: 禁用自动初始化
window.LIVE2D_AUTO_INIT = false;

// 📍 第48-51行: 导入必要函数
import { togglePanel, getPanelState } from '/src/main.js';
import { initLive2dWithDialogue } from '/src/dialog-api.js';

let globalSay = null;  // 保存say函数

// 📍 第53-78行: init() 初始化
async function init() {
  const { controller, say } = await initLive2dWithDialogue({
    canvasId: 'canvas',
    characterConfigs: [
      { id: 'hiyori', modelJsonUrl: '/live2d/hiyori/hiyori_pro_t11.model3.json', 
        scale: 0.2, position: { xRatio: 0.3, yRatio: 0.95 } },
      { id: 'mao', modelJsonUrl: '/live2d/mao/mao_pro.model3.json',
        scale: 0.11, position: { xRatio: 0.7, yRatio: 0.95 } }
    ],
    enablePanel: true  // ⚠️ 必须显式传递
  });
  
  globalSay = say;  // ⚠️ 保存到全局变量
}

// 📍 第108-142行: postMessage监听器
window.addEventListener('message', async (event) => {
  const { type, data } = event.data;
  
  if (type === 'live2d-say') {
    const result = await globalSay(data);  // 调用气泡
    window.parent.postMessage({ type: 'live2d-say-result', success: true }, '*');
  } 
  else if (type === 'toggle-panel') {
    const visible = togglePanel();  // 切换Panel
    window.parent.postMessage({ type: 'panel-toggled', visible }, '*');
  }
});
```

**修改指南**:

- **调整角色位置**: 修改`position`参数 (第57-65行)
- **添加/删除角色**: 修改`characterConfigs`数组
- **修改postMessage处理**: 修改监听器逻辑 (第108-142行)

---

### 2️⃣ Electron 主程序 (`flowradio-ui/`)

#### **`public/index.html`** - 主窗口

**作用**: Electron的主界面,嵌入Live2D iframe

**关键代码位置**:

```html
<!-- 📍 第6行: CSP安全策略 -->
<meta http-equiv="Content-Security-Policy" content="
  frame-src http://localhost:5173 http://localhost:5174;
  ...
">

<!-- 📍 第304行: Live2D iframe -->
<iframe 
  id="live2d-frame" 
  src="http://localhost:5173/flowradio.html"  
  <!-- ⚠️ 端口必须与Vite服务一致 -->
  allow="autoplay"
></iframe>
```

**修改指南**:

- **更换Live2D端口**: 修改iframe `src`和CSP的`frame-src` (必须同步修改)
- **调整iframe样式**: 修改CSS (第290-302行)

---

#### **`src/renderer.js`** - 主进程逻辑

**作用**: 处理WebSocket消息、发送postMessage到iframe、管理UI交互

**关键代码位置**:

```javascript
// 📍 第127-150行: 监听iframe的postMessage响应
window.addEventListener('message', (event) => {
  const { type, success, visible } = event.data;
  
  if (type === 'live2d-ready') {
    this.live2dReady = true;
  }
  else if (type === 'live2d-say-result') {
    console.log('气泡显示完成');
  }
  else if (type === 'panel-toggled') {
    console.log(`Panel现在: ${visible ? '显示' : '隐藏'}`);
  }
});

// 📍 第332-393行: 处理Coze的HOST_MESSAGE
handleHostMessage(data) {
  const { script, tts_url } = data;
  
  // 显示顶部消息
  this.topBar.showMessage(`🎙️ ${script}`, 30000, 'superchat');
  
  // 保存聊天记录
  this.saveChatHistory('AI', script, tts_url);
  
  // ⭐ 触发Live2D说话
  this.triggerLive2DSpeech(script, tts_url);
}

// 📍 第424-465行: 发送postMessage到iframe
async triggerLive2DSpeech(text, audioUrl = null) {
  const iframe = document.getElementById('live2d-frame');
  
  await this.waitForLive2DReady();  // 等待iframe准备好
  
  // 发送消息到iframe
  iframe.contentWindow.postMessage({
    type: 'live2d-say',
    data: {
      id: 'hiyori',
      text: text,
      audioUrl: audioUrl,
      motion: '说话',
      charsPerSec: 8,
      fontSize: 18,
      maxLines: 3,
      maxCharsPerLine: 14
    }
  }, '*');
}

// 📍 第945-963行: Panel切换按钮
togglePanelButton.addEventListener('click', () => {
  const iframe = document.getElementById('live2d-frame');
  iframe.contentWindow.postMessage({ type: 'toggle-panel' }, '*');
});
```

**修改指南**:

- **修改气泡内容**: 修改`triggerLive2DSpeech()`的`data`参数 (第440-455行)
- **处理新的postMessage类型**: 在监听器添加新的`else if`分支 (第127-150行)
- **修改Coze响应处理**: 修改`handleHostMessage()` (第332-393行)

---

### 3️⃣ 后端服务 (`backend/`)

#### **`main.go`** - WebSocket服务器

**作用**: 连接Coze API,接收用户消息,转发AI回复

**关键代码位置**:

```go
// 📍 第200-250行: WebSocket消息处理
func (app *App) handleWebSocketMessage(ws *websocket.Conn, msg WebSocketMessage) {
  if msg.Type == "USER_MESSAGE" {
    // 发送到Coze API
    app.sendMessageToCoze(msg.Content)
  }
}

// 📍 第300-350行: Coze SSE响应处理
func (app *App) handleCozeResponse(ws *websocket.Conn) {
  // 接收Coze的流式响应
  // 转发HOST_MESSAGE到前端
  ws.WriteJSON(WebSocketMessage{
    Type: "HOST_MESSAGE",
    Data: map[string]interface{}{
      "script":  extractedText,
      "tts_url": ttsUrl,
    },
  })
}
```

**修改指南**:

- **更换AI后端**: 修改`sendMessageToCoze()`函数
- **修改消息格式**: 修改`WebSocketMessage`结构体
- **添加新的消息类型**: 在`handleWebSocketMessage()`添加新的`case`

---

## 常见修改场景

### 🎯 场景1: 调整Live2D角色位置和大小

**文件**: `live2d/flowradio.html`  
**位置**: 第57-65行  

```javascript
characterConfigs: [
  { 
    id: 'hiyori', 
    modelJsonUrl: '/live2d/hiyori/hiyori_pro_t11.model3.json', 
    scale: 0.2,  // 🔧 修改这里调整大小 (0.1 = 10%)
    position: { xRatio: 0.3, yRatio: 0.95 }  // 🔧 修改这里调整位置
    // xRatio: 0 = 最左, 0.5 = 中间, 1 = 最右
    // yRatio: 0 = 最上, 0.5 = 中间, 1 = 最下
  },
  { 
    id: 'mao', 
    scale: 0.11, 
    position: { xRatio: 0.7, yRatio: 0.95 }
  }
]
```

---

### 🎯 场景2: 修改气泡样式 (字体大小、显示速度、行数)

**文件**: `flowradio-ui/src/renderer.js`  
**位置**: 第440-455行  

```javascript
iframe.contentWindow.postMessage({
  type: 'live2d-say',
  data: {
    id: 'hiyori',
    text: text,
    audioUrl: audioUrl,
    motion: '说话',
    crossOrigin: 'anonymous',
    charsPerSec: 8,  // 🔧 修改文字显示速度 (每秒字符数)
    fontSize: 18,    // 🔧 修改字体大小 (像素)
    maxLines: 3,     // 🔧 修改最大行数
    maxCharsPerLine: 14  // 🔧 修改每行最大字符数
  }
}, '*');
```

---

### 🎯 场景3: 更换Live2D模型

**文件**: `live2d/flowradio.html`  
**位置**: 第57-65行  

```javascript
characterConfigs: [
  { 
    id: 'new_character',  // 🔧 修改角色ID
    modelJsonUrl: '/live2d/new_model/model.model3.json',  // 🔧 修改模型路径
    scale: 0.2,
    position: { xRatio: 0.5, yRatio: 0.95 }
  }
]
```

⚠️ **注意**: 
1. 模型文件必须放在`live2d/public/live2d/`目录下
2. 修改ID后,需同步修改`renderer.js`中的`triggerLive2DSpeech()`的`id`参数

---

### 🎯 场景4: 修改Panel显示/隐藏

**文件**: `live2d/flowradio.html`  
**位置**: 第72行  

```javascript
await initLive2dWithDialogue({
  // ...
  enablePanel: true  // 🔧 改为false禁用Panel
});
```

**或在运行时切换**:  
**文件**: `flowradio-ui/src/renderer.js`  
**位置**: 第945-963行 (Panel按钮)

```javascript
togglePanelButton.addEventListener('click', () => {
  const iframe = document.getElementById('live2d-frame');
  iframe.contentWindow.postMessage({ type: 'toggle-panel' }, '*');
});
```

---

### 🎯 场景5: 修改Coze响应的处理逻辑

**文件**: `flowradio-ui/src/renderer.js`  
**位置**: 第332-393行  

```javascript
handleHostMessage(data) {
  const { script, tts_url } = data;
  
  // 🔧 在这里添加自定义处理逻辑
  console.log('收到AI回复:', script);
  
  // 显示顶部消息
  this.topBar.showMessage(`🎙️ ${script}`, 30000, 'superchat');
  
  // 保存聊天记录
  this.saveChatHistory('AI', script, tts_url);
  
  // 触发Live2D说话
  this.triggerLive2DSpeech(script, tts_url);
  
  // 🔧 可以在这里添加: 播放音效、显示特效、保存到数据库等
}
```

---

### 🎯 场景6: 修改iframe端口 (Live2D服务地址)

**需要修改2个文件**:

1. **文件**: `flowradio-ui/public/index.html`  
   **位置**: 第6行和第304行  

```html
<!-- 第6行: CSP -->
<meta http-equiv="Content-Security-Policy" content="
  frame-src http://localhost:5173 http://localhost:NEW_PORT;
                              👆 修改这里
">

<!-- 第304行: iframe -->
<iframe 
  id="live2d-frame" 
  src="http://localhost:5173/flowradio.html"
                      👆 修改这里
></iframe>
```

2. **启动Vite时指定端口**:  

```bash
cd live2d
npm run dev -- --port NEW_PORT
```

---

## 代码修改位置速查表

| 功能 | 文件 | 行数 | 说明 |
|------|------|------|------|
| **角色位置/大小** | `live2d/flowradio.html` | 57-65 | 修改`scale`和`position` |
| **气泡样式** | `flowradio-ui/src/renderer.js` | 440-455 | 修改`fontSize`、`charsPerSec`等 |
| **启用/禁用Panel** | `live2d/flowradio.html` | 72 | 修改`enablePanel` |
| **Panel切换逻辑** | `live2d/src/main.js` | 108-117 | 修改`togglePanel()`函数 |
| **postMessage监听** | `live2d/flowradio.html` | 108-142 | 添加新的消息类型处理 |
| **Coze响应处理** | `flowradio-ui/src/renderer.js` | 332-393 | 修改`handleHostMessage()` |
| **iframe地址** | `flowradio-ui/public/index.html` | 6, 304 | 修改端口号 |
| **添加新角色** | `live2d/flowradio.html` | 57-65 | 添加到`characterConfigs`数组 |

---

## 调试指南

### 🔍 打开开发者工具

**Electron主窗口**:  
按 `Ctrl+Shift+I` (Windows) 或 `Cmd+Option+I` (Mac)

**Live2D iframe**:  
1. 在主窗口开发者工具的Console输入:
```javascript
document.getElementById('live2d-frame').contentWindow
```
2. 或直接访问: http://localhost:5173/flowradio.html

---

### 🐛 常用调试命令

**检查Live2D是否初始化**:
```javascript
// 在iframe控制台
window.live2dController
window.say
```

**检查Panel状态**:
```javascript
// 在iframe控制台
getPanelState()
```

**手动触发气泡**:
```javascript
// 在iframe控制台
say({ 
  id: 'hiyori', 
  text: '测试气泡', 
  motion: '说话' 
})
```

**手动切换Panel**:
```javascript
// 在iframe控制台
togglePanel()
```

**检查postMessage通信**:
```javascript
// 在主窗口控制台
window.addEventListener('message', (e) => {
  console.log('[Main] 收到消息:', e.data);
});

// 在iframe控制台
window.addEventListener('message', (e) => {
  console.log('[iframe] 收到消息:', e.data);
});
```

---

### 📊 关键日志位置

**初始化日志**:
- `[Init] 🚀 开始初始化Live2D...` - flowradio.html开始加载
- `[Init] ✅ initLive2dWithDialogue 完成` - Live2D初始化成功
- `[main.js] Panel created and ready` - Panel创建成功

**postMessage通信日志**:
- `[Live2D] 📨 收到消息:` - iframe收到父窗口消息
- `[Live2D] 📤 Sending say command` - 父窗口发送say命令
- `[Live2D] 📢 调用say:` - iframe开始处理say命令
- `[Live2D] ✅ say成功:` - 气泡显示成功

**Panel操作日志**:
- `[main.js] Panel toggled: visible` - Panel切换成功
- `[Panel] Toggle button ready` - Panel按钮初始化完成

---

## 常见问题排查

### ❌ 问题: Live2D角色不显示

**检查清单**:
1. ✅ Vite服务是否启动: `cd live2d && npm run dev`
2. ✅ 端口是否正确: iframe `src`和Vite端口一致 (默认5173)
3. ✅ 控制台是否有404错误: 模型文件路径是否正确
4. ✅ Canvas是否创建: `document.getElementById('canvas')`
5. ✅ 查看日志: 是否有`[Init] ✅ initLive2dWithDialogue 完成`

---

### ❌ 问题: 气泡不显示

**检查清单**:
1. ✅ `globalSay`是否初始化: 在iframe控制台输入`globalSay`
2. ✅ postMessage是否发送: 主窗口控制台看到`[Live2D] 📤 Sending say command`
3. ✅ iframe是否收到消息: iframe控制台看到`[Live2D] 📨 收到消息:`
4. ✅ say是否执行: iframe控制台看到`[Live2D] 📢 调用say:`
5. ✅ 手动测试: 在iframe控制台执行`say({ id: 'hiyori', text: '测试' })`

---

### ❌ 问题: Panel不显示/无法切换

**检查清单**:
1. ✅ `enablePanel`是否为`true`: 检查flowradio.html第72行
2. ✅ Panel是否创建: 在iframe控制台输入`getPanelState()`
3. ✅ togglePanel是否正常: 在iframe控制台执行`togglePanel()`
4. ✅ postMessage是否发送: 主窗口点击按钮后控制台有日志
5. ✅ 查看日志: 是否有`[main.js] Panel created and ready`

---

### ❌ 问题: postMessage通信失败

**检查清单**:
1. ✅ iframe是否加载完成: 等待`live2d-ready`消息
2. ✅ 端口是否正确: CSP和iframe src一致
3. ✅ 跨域问题: postMessage的`targetOrigin`使用`'*'`
4. ✅ 消息格式: 检查`type`和`data`字段是否正确
5. ✅ 监听器是否注册: `window.addEventListener('message', ...)`

---

### ❌ 问题: Coze回复不触发Live2D

**检查清单**:
1. ✅ WebSocket是否连接: 后端服务是否启动
2. ✅ HOST_MESSAGE是否收到: renderer.js控制台有日志
3. ✅ handleHostMessage是否执行: 检查`saveChatHistory`是否调用
4. ✅ triggerLive2DSpeech是否执行: 检查postMessage是否发送
5. ✅ iframe是否ready: 检查`this.live2dReady`为`true`

---

## 项目启动流程

### 完整启动步骤

```bash
# 1. 启动后端 (WebSocket服务)
cd backend
go run main.go

# 2. 启动Live2D服务 (Vite)
cd ../live2d
npm run dev

# 3. 启动Electron主程序
cd ../flowradio-ui
npm run dev
```

### 服务端口说明

- **后端WebSocket**: `ws://localhost:8080`
- **Live2D服务**: `http://localhost:5173`
- **Electron**: 自动打开窗口

---

## 架构原理图

```
┌─────────────────────────────────────────────────────────────┐
│                    Electron 主窗口                          │
│  (file://)                                                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  renderer.js (主进程逻辑)                           │   │
│  │                                                     │   │
│  │  WebSocket ←→ Backend (Coze API)                   │   │
│  │       ↓                                             │   │
│  │  handleHostMessage()                                │   │
│  │       ↓                                             │   │
│  │  triggerLive2DSpeech() ─────postMessage────┐       │   │
│  └─────────────────────────────────────────────┼───────┘   │
│                                                │            │
│  ┌─────────────────────────────────────────────▼───────┐   │
│  │  <iframe> - Live2D                                  │   │
│  │  (http://localhost:5173/flowradio.html)             │   │
│  │                                                     │   │
│  │  ┌────────────────────────────────────────────┐    │   │
│  │  │  flowradio.html (入口)                     │    │   │
│  │  │                                            │    │   │
│  │  │  window.addEventListener('message') ───┐  │    │   │
│  │  │                ↓                       │  │    │   │
│  │  │  type: 'live2d-say' ──→ globalSay()   │  │    │   │
│  │  │  type: 'toggle-panel' ─→ togglePanel()│  │    │   │
│  │  │                ↓                       │  │    │   │
│  │  │  main.js (核心) ←──────────────────────┘  │    │   │
│  │  │    - globalPanel                          │    │   │
│  │  │    - togglePanel()                        │    │   │
│  │  │                                            │    │   │
│  │  │  dialog-api.js (气泡系统)                 │    │   │
│  │  │    - say()                                 │    │   │
│  │  └────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 总结

### ⭐ 核心原则

1. **单一真相源**: Panel控制只在`main.js`的`globalPanel`变量
2. **postMessage通信**: Electron主窗口和iframe通过postMessage跨域通信
3. **全局变量**: `globalSay`保存say函数,供message监听器使用
4. **enablePanel必须传递**: 初始化时显式传`enablePanel: true`

### 🎯 关键文件

- **`live2d/src/main.js`**: 核心初始化 + Panel控制
- **`live2d/flowradio.html`**: iframe入口 + postMessage监听
- **`flowradio-ui/src/renderer.js`**: 主进程逻辑 + WebSocket + postMessage发送
- **`flowradio-ui/public/index.html`**: iframe嵌入

### 📝 修改前必读

1. **修改端口**: 必须同步修改CSP和iframe src
2. **修改角色**: 必须同步修改ID和模型路径
3. **添加postMessage类型**: 必须同时修改发送和监听逻辑
4. **修改初始化参数**: 注意`enablePanel`必须显式传递

---

**编写时间**: 2025  
**适用版本**: FlowRadio v1.0  
**维护者**: GitHub Copilot

如有问题,请检查控制台日志或参考[调试指南](#调试指南)
