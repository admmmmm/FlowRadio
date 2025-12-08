# FlowRadio 架构说明

## 服务组成 (4个独立进程)

```
┌─────────────────────────────────────────────────────────┐
│ 1. Lyria Service (Python Flask)                         │
│    - 端口: 8000                                          │
│    - 功能: 音乐生成 (Magenta)                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 2. Go Backend (WebSocket Server)                        │
│    - 端口: 8080/ws                                       │
│    - 功能: Coze API集成, 消息路由                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 3. Live2D Service (Vite Dev Server)                     │
│    - 端口: 5173                                          │
│    - 入口: flowradio.html                                │
│    - 功能: Live2D角色渲染 + 气泡对话                     │
│    - 核心API: initLive2dWithDialogue() → { say }        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 4. FlowRadio UI (Electron)                              │
│    - 主程序                                              │
│    - HTML: flowradio-ui/public/index.html               │
│    - 渲染: flowradio-ui/src/renderer.js                 │
│    - 功能: UI + WebSocket客户端 + 音频播放              │
└─────────────────────────────────────────────────────────┘
```

## 通信流程

### Live2D 气泡显示流程

```
用户输入 → Go Backend → Coze API
    ↓
HOST_MESSAGE {script, tts_url}
    ↓
renderer.js: handleHostMessage()
    ↓
triggerLive2DSpeech(script, tts_url)
    ↓
postMessage → Live2D iframe
    ↓
type: 'live2d-say'
data: { id, text, audioUrl, motion, ... }
    ↓
flowradio.html: message监听器
    ↓
say({ id, text, audioUrl, ... })
    ↓
显示气泡 + 播放动作
    ↓
postMessage ← 'live2d-say-result'
    ↓
renderer.js: 显示TopBar提示
```

### Panel 切换流程

```
设置面板按钮点击
    ↓
postMessage → Live2D iframe
    ↓
type: 'toggle-panel'
    ↓
flowradio.html: 切换panel.visible
    ↓
postMessage ← 'panel-toggled' {enabled}
    ↓
renderer.js: 更新按钮文本
```

## 关键文件

### Live2D 仓库 (`live2d/`)

1. **src/main.js** - 核心初始化
   ```javascript
   export async function initLive2d({
     canvasId,
     characterConfigs,
     persist,
     enablePanel  // ← 控制是否创建Panel
   })
   ```

2. **src/dialog-api.js** - 对话API
   ```javascript
   export async function initLive2dWithDialogue(options)
   // 返回: { controller, say }
   ```

3. **flowradio.html** - FlowRadio专用入口
   - 初始化2个角色 (hiyori + mao)
   - enablePanel: true (创建Panel但初始隐藏)
   - postMessage监听器

### FlowRadio UI (`flowradio-ui/`)

1. **public/index.html**
   - 嵌入Live2D iframe: `http://localhost:5173/flowradio.html`
   - 早期初始化设置面板交互

2. **src/renderer.js**
   - FlowRadioApp类
   - WebSocket消息处理
   - Live2D通信 (postMessage)
   - 音频播放

## 重要参数

### say() API 参数

```javascript
await say({
  id: 'hiyori',              // 角色ID
  text: '你好',              // 对话文字
  audioUrl: 'http://...',    // 可选语音URL
  motion: '说话',            // 动作名称
  expression: null,          // 表情索引
  crossOrigin: 'anonymous',  // CORS设置
  charsPerSec: 8,           // 文字滚动速度
  fontSize: 18,             // 字体大小
  maxLines: 3,              // 最大行数
  maxCharsPerLine: 14       // 每行最大字符
})
```

### enablePanel 说明

- **true**: 创建Live2DPanel调试面板
- **false**: 不创建Panel (无法后续显示)
- **位置**: `live2d/src/main.js` 第163行
- **flowradio.html中设置为true** (方便调试和切换)

## 调试提示

1. 检查Live2D加载: `http://localhost:5173/flowradio.html` 直接访问
2. 检查postMessage: F12 → Console → 搜索 "📨" 或 "📤"
3. 检查Panel: 右下角应该有"Panel: OFF"按钮
4. 测试say: 在Live2D页面console输入:
   ```javascript
   window.say({id:'hiyori', text:'测试', charsPerSec:8, fontSize:18})
   ```
