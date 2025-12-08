# FlowRadio 集成状态

## ✅ 已完成的集成

### 1. Live2D 使用方式
**当前方案**: 使用 `live2d/` Git 仓库,通过 iframe 嵌入

```
flowradio-ui (Electron)
  └─ iframe: http://localhost:5173/flowradio.html
       └─ live2d/src/main.js (独立Vite服务)
```

**文件位置**:
- Live2D 源码: `d:\dev\FlowRadio\live2d\src\`
  - `main.js` - 主初始化逻辑
  - `dialog-api.js` - 对话气泡API
  - `character-manager.js` - 角色管理
  - `action.js` - 动作控制器
  - `panel-dev.js` - 开发面板

- HTML入口: `live2d/flowradio.html`
- Vite服务: 端口 5173

**优点**:
- ✅ 使用原始Git仓库,方便更新
- ✅ 独立开发和调试
- ✅ 避免Electron CSP问题
- ✅ 支持HMR热更新

### 2. Coze 后端集成 ✅ 已修复

**问题**: 前端发送 `user_message`,后端期待 `USER_INPUT`

**修复**: 
```javascript
// 修复前
{type: 'user_message', message: 'xxx'}

// 修复后 ✅
{
  type: 'USER_INPUT',
  data: {text: 'xxx'},
  timestamp: Date.now()
}
```

**后端处理流程**:
```
用户输入 
  → WebSocket 接收 USER_INPUT
  → handleUserInput()
  → handleUserInputWithCoze()
  → CozeClient.GenerateMusicAndAtmosphere()
  → 返回:
      - HOST_MESSAGE (主持人播报)
      - MUSIC_PARAMS (音乐参数)
      - ATMOSPHERE (气氛组)
      - AUDIO_CHUNK (TTS音频流)
```

### 3. 消息处理完整链路 ✅

**前端 → 后端**:
```javascript
// flowradio-ui/src/renderer.js
handleUserMessage(message) {
  ws.send({
    type: 'USER_INPUT',
    data: {text: message}
  });
}
```

**后端 → 前端**:
```javascript
// 处理各种消息类型
handleBackendMessage(data) {
  switch (data.type) {
    case 'HOST_MESSAGE':     // Coze主持人播报
      → 显示TopBar
      → 调用Live2D气泡
      
    case 'MUSIC_PARAMS':     // 音乐参数
      → 重置音频缓冲
      → 显示BPM提示
      
    case 'ATMOSPHERE':       // 气氛组评论
      → 延迟显示回复
      
    case 'AUDIO_CHUNK':      // TTS音频
      → 播放语音
  }
}
```

### 4. Live2D 气泡显示 ✅

```javascript
triggerLive2DSpeech(text, audioUrl) {
  iframe.contentWindow.say({
    id: 'hiyori',
    text: text,        // 显示在气泡
    audioUrl: audioUrl, // TTS语音
    motion: '说话',
    expression: null
  });
}
```

**效果**:
- 💬 文字显示在角色头顶气泡
- 🎭 触发"说话"动作
- 🔊 播放TTS语音(如果有)

### 5. 音频播放系统 ✅

**完整实现**:
- ✅ 预缓冲机制 (10块 ≈ 210ms)
- ✅ 48kHz立体声解码
- ✅ 精确时间调度
- ✅ 时间漂移自动修正
- ✅ AudioContext状态恢复

```javascript
// 参考 electron-ui 的官方实现
handleAudioChunk(data) {
  → Buffer.from(data.data, 'base64')
  → Int16 PCM 解码
  → 立体声解交错
  → AudioBuffer.copyToChannel()
  → 精确时间播放
}
```

## 📋 启动流程

### 使用 `start.ps1` 一键启动:

```powershell
cd D:\dev\FlowRadio
.\start.ps1
```

**启动顺序**:
1. Lyria 音乐服务 (Python, 端口 8000)
2. Go 后端服务 (WebSocket, 端口 8080)
3. Live2D 服务 (Vite, 端口 5173)
4. FlowRadio UI (Electron)

**检查清单**:
- ✅ `.env` 文件配置正确
- ✅ `COZE_API_TOKEN` 已设置
- ✅ `MAIN_WORKFLOW_ID` 已设置
- ✅ Go 后端无编译错误
- ✅ Live2D 资源文件完整

## 🔍 调试方法

### 1. 检查 WebSocket 连接
```javascript
// 在 Electron DevTools Console 中
flowRadioApp.ws.readyState
// 1 = OPEN, 0 = CONNECTING, 2 = CLOSING, 3 = CLOSED
```

### 2. 测试消息发送
```javascript
// 手动发送测试消息
flowRadioApp.ws.send(JSON.stringify({
  type: 'USER_INPUT',
  data: {text: '播放一首轻松的音乐'},
  timestamp: Date.now()
}));
```

### 3. 查看后端日志
```
后端窗口应该显示:
📥 收到用户输入: xxx
🎯 使用 Coze 工作流处理请求
✅ Coze Main 工作流成功
```

### 4. Live2D 气泡测试
```javascript
// 手动触发气泡
const iframe = document.getElementById('live2d-frame');
iframe.contentWindow.say({
  id: 'hiyori',
  text: '测试气泡显示',
  motion: '说话'
});
```

## 🐛 常见问题

### Q1: 后端收不到用户输入
**原因**: 消息格式不匹配
**解决**: 已修复,现在使用 `USER_INPUT` + `data.text` 格式

### Q2: Live2D 不显示气泡
**原因**: iframe 未完全加载或API不可用
**检查**: 
```javascript
iframe.contentWindow.say  // 应该是函数
iframe.contentWindow.live2dController  // 应该存在
```

### Q3: 没有声音
**原因**: 浏览器阻止自动播放
**解决**: 用户必须先点击页面激活 AudioContext

### Q4: Coze 不响应
**检查**:
1. `.env` 中 `COZE_API_TOKEN` 是否正确
2. `MAIN_WORKFLOW_ID` 是否正确
3. 后端日志是否显示 API 调用错误

## 📁 项目结构

```
FlowRadio/
├── backend/              # Go WebSocket 后端
│   ├── main.go
│   ├── websocket_handler.go
│   ├── coze_client.go   # ✅ Coze API 集成
│   └── llm_proxy.go
│
├── flowradio-ui/        # Electron 主应用
│   ├── src/
│   │   └── renderer.js  # ✅ 主逻辑(已修复消息格式)
│   └── public/
│       └── index.html   # iframe 嵌入点
│
├── live2d/              # ✅ 独立 Live2D Git 仓库
│   ├── src/
│   │   ├── main.js
│   │   ├── dialog-api.js
│   │   └── character-manager.js
│   └── flowradio.html
│
├── lyria_service.py     # Lyria 音乐服务
├── start.ps1            # ✅ 统一启动脚本
└── .env                 # 环境变量配置
```

## ✅ 当前状态总结

1. ✅ **Live2D**: 使用 `live2d/` Git 仓库,通过 iframe 嵌入
2. ✅ **Coze 集成**: 消息格式已修复,后端能正确接收 `USER_INPUT`
3. ✅ **音频播放**: 完整实现预缓冲和精确时间调度
4. ✅ **气泡显示**: 主持人文字显示在角色头顶
5. ✅ **一键启动**: `start.ps1` 统一管理所有服务

## 🚀 下一步测试

1. 启动系统: `.\start.ps1`
2. 等待所有服务就绪(约10秒)
3. 在底部输入框输入: `播放一首轻松的音乐`
4. 观察:
   - 🎙️ TopBar 显示主持人回复
   - 💬 Live2D 气泡显示文字
   - 🔊 听到 TTS 语音
   - 🎵 背景音乐变化

---
**最后更新**: 2025年12月7日
**状态**: ✅ 主要集成完成,等待测试验证
