# 🎵 FlowRadio 完整系统集成指南

## 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    FlowRadio Complete System                 │
└─────────────────────────────────────────────────────────────┘
           │
           ├─── 🎵 Lyria Music Service (Python)
           │     └─ Port: 8000
           │     └─ Endpoint: /stream, /start, /style
           │
           ├─── 🔧 Go Backend (WebSocket)
           │     └─ Port: 8080
           │     └─ Endpoint: /ws
           │     └─ Features: AI Chat, Music Control
           │
           ├─── 🎎 Live2D Service (Vite)
           │     └─ Port: 5173
           │     └─ Page: /flowradio.html
           │     └─ Features: 双主播 + 字幕气泡
           │
           └─── 🖥️ FlowRadio UI (Electron)
                 └─ Features: PixiJS背景 + Live2D集成 + 音频分析
```

## 🚀 快速启动

### 一键启动所有服务

```powershell
cd D:\dev\FlowRadio
.\start-complete.ps1
```

**启动顺序：**
1. Lyria Music Service (Python)
2. Go WebSocket Backend
3. Live2D Service (Vite Dev Server)
4. FlowRadio UI (Electron)

### 环境要求

**Python 依赖：**
```bash
pip install flask google-generativeai numpy
```

**Go 依赖：**
```bash
cd backend
go mod download
```

**Node.js 依赖：**
```bash
# Live2D
cd live2d
npm install

# FlowRadio UI
cd ../flowradio-ui
npm install
```

## 📋 服务说明

### 1️⃣ Lyria Music Service

**功能：**
- 实时生成 AI 音乐流
- 支持风格切换（lofi, pop, jazz等）
- 支持 prompt 权重控制
- 48kHz 立体声输出

**API：**
- `POST /start` - 启动音乐会话
- `POST /stop` - 停止会话
- `POST /style` - 切换风格
- `GET /stream` - 音频流（48kHz WAV）
- `GET /status` - 获取状态

**环境变量：**
- `GEMINI_API_KEY` - Google Gemini API 密钥

### 2️⃣ Go Backend

**功能：**
- WebSocket 双向通信
- AI 聊天（Coze 或 Volcano LLM）
- 音乐风格推荐
- 状态管理

**WebSocket 消息格式：**

**客户端 → 服务器：**
```json
{
  "type": "user_message",
  "message": "播放一首轻松的音乐",
  "timestamp": 1234567890
}
```

**服务器 → 客户端：**
```json
{
  "type": "chat_response",
  "message": "好的！为你播放 lofi 音乐~",
  "action": {
    "characterId": "hiyori",
    "text": "好的！为你播放 lofi 音乐~",
    "motion": "说话",
    "expression": 0
  }
}
```

**环境变量：**
- `COZE_API_TOKEN` - Coze AI Token（推荐）
- `VOLCANO_API_KEY` - 火山引擎 API Key（备用）
- `MAIN_WORKFLOW_ID` - Coze 主工作流 ID
- `MAIN_APP_ID` - Coze 主应用 ID

### 3️⃣ Live2D Service

**功能：**
- 双主播渲染（Hiyori + Mao）
- 动作/表情控制
- 音频 + 口型同步
- 字幕气泡显示（新增）
- 自然语言映射

**暴露 API（window 对象）：**

```javascript
// 基础控制器
window.live2dController = {
  act(id, input, extra),
  actAll(input, extra),
  actWithAudio(id, input, soundUrl, extra),
  setMode(id, mode),
  list(),
  stopMotions(id)
}

// 对话 API（带字幕气泡）
window.say({
  id: 'hiyori',
  text: '你好！',
  audioUrl: '/audio/hello.mp3',  // 可选
  motion: '挥手',                  // 可选
  expression: 0                   // 可选
})
```

**字幕气泡特性：**
- 漫画风粉色渐变气泡
- 自动换行（14 字/行，最多 3 行）
- 超长文本尾部截断 + 省略号
- 5 秒自动消失
- 跟随角色位置

### 4️⃣ FlowRadio UI

**功能：**
- Neon Tetris 音乐驱动背景
- Live2D iframe 集成
- 实时音频分析
- WebSocket 通信
- 响应式布局

**布局：**
```
┌────────────────────────────────────┐
│      TopBar (SuperChat/提示)       │
├──────┬──────────────────┬─────────┤
│      │                  │         │
│Live2D│  Neon Tetris BG  │ Live2D  │
│(左)  │   + 音频可视化    │  (右)   │
│      │                  │         │
├──────┴──────────────────┴─────────┤
│       BottomInput (输入框)         │
└────────────────────────────────────┘
```

## 🔗 数据流向

### 用户消息流程

```
用户输入
  │
  ▼
BottomInput (UI)
  │
  ▼
WebSocket → Go Backend
  │
  ├─ AI 处理 (Coze/LLM)
  │
  ▼
WebSocket ← 返回结果
  │
  ├─ TopBar 显示消息
  │
  └─ Live2D 触发动作
       │
       ▼
     iframe postMessage
       │
       ▼
     window.say({...})
       │
       ├─ 角色动作
       ├─ 字幕气泡
       └─ 口型同步
```

### 音乐流程

```
Lyria Service
  │
  ├─ 生成音乐流 (48kHz)
  │
  ▼
Audio Element (UI)
  │
  ├─ Web Audio API
  │
  ▼
AudioAnalyzer
  │
  ├─ FFT 分析
  ├─ 节拍检测
  │
  ▼
TetrisNeonBackground
  │
  ├─ Kick  → 震动
  ├─ Snare → 旋转
  └─ Hihat → 颜色
```

## 🎮 使用示例

### 1. 发送聊天消息

用户在底部输入框输入：
```
"播放一首轻松的lofi音乐"
```

**系统响应：**
1. 显示在 TopBar
2. 发送到 Go Backend
3. AI 分析意图
4. 返回回复 + 动作指令
5. Live2D 主播说话 + 显示字幕
6. Lyria 切换到 lofi 风格

### 2. 音乐驱动视觉效果

**音频分析 → 视觉映射：**
- **Kick (低频 60-250Hz)**
  - 触发：屏幕震动
  - 效果：方块脉冲放大
  - 强度：基于能量级别

- **Snare (中频 200-600Hz)**
  - 触发：方块旋转
  - 效果：随机旋转脉冲
  - 颜色：轻微闪烁

- **Hi-hat (高频 5k-10kHz)**
  - 触发：颜色跃迁
  - 效果：Neon 光晕变化
  - 周期：快速闪烁

### 3. Live2D 对话示例

**通过 iframe 控制：**

```javascript
// 获取 iframe
const iframe = document.getElementById('live2d-frame');

// 调用对话 API
iframe.contentWindow.say({
  id: 'hiyori',
  text: '欢迎来到 FlowRadio！今天想听什么音乐呢？',
  motion: '挥手',
  expression: 0
});
```

**字幕显示：**
- 粉色漫画气泡
- 角色头顶位置
- 自动换行
- 5 秒后消失

## ⚙️ 配置文件

### .env 环境变量

```env
# Gemini API (Required)
GEMINI_API_KEY=your_gemini_api_key_here

# Coze AI (Recommended)
COZE_API_TOKEN=your_coze_token_here
MAIN_WORKFLOW_ID=your_workflow_id
MAIN_APP_ID=your_app_id
COMMENT_WORKFLOW_ID=your_comment_workflow_id
COMMENT_APP_ID=your_comment_app_id

# Volcano LLM (Fallback)
VOLCANO_API_KEY=your_volcano_key_here
```

### flowradio-ui/package.json

```json
{
  "dependencies": {
    "pixi.js": "^7.4.2",
    "electron": "^28.0.0"
  }
}
```

### live2d/package.json

已包含所有必要依赖（pixi.js, pixi-live2d-display-lipsyncpatch 等）

## 🐛 故障排除

### 问题 1: Live2D 不显示

**原因：** Vite 服务未启动或端口冲突

**解决：**
```powershell
cd live2d
npm run dev
```
确保 http://localhost:5173 可访问

### 问题 2: WebSocket 连接失败

**原因：** Go Backend 未启动

**解决：**
```powershell
cd backend
go run .
```
检查 ws://localhost:8080/ws

### 问题 3: 音乐无声

**原因：** Lyria Service 未启动或 API Key 无效

**解决：**
1. 检查 `GEMINI_API_KEY`
2. 启动服务：`python lyria_service.py`
3. 点击页面解锁音频播放（浏览器限制）

### 问题 4: 字幕不显示

**原因：** Live2D 初始化未完成

**解决：**
- 等待 Live2D 加载完成（查看 Console）
- 确认 `window.say` 函数存在
- 检查 iframe 通信

## 📊 性能监控

### 关键指标

- **FPS**: 目标 60 FPS（PixiJS）
- **音频延迟**: < 50ms
- **WebSocket 延迟**: < 100ms
- **Live2D 渲染**: < 16ms/frame

### 性能优化

1. **PixiJS 背景**
   - Sprite 池复用
   - 纹理 Atlas
   - 批处理渲染

2. **Live2D**
   - iframe 隔离
   - 按需加载模型
   - 动作队列限制

3. **音频**
   - FFT 降采样
   - 节拍检测阈值优化
   - 历史缓冲限制

## 📝 开发建议

### 添加新的 AI 动作

1. 在 Go Backend 中定义动作类型
2. 返回 `action` 对象
3. UI 接收并调用 `window.say()`

```go
// backend/main.go
action := map[string]interface{}{
    "characterId": "hiyori",
    "text": aiResponse,
    "motion": "说话",
    "expression": 0,
}
```

### 添加新的背景主题

1. 继承 `BackgroundBase`
2. 实现 `init`, `update`, `resize`, `destroy`
3. 在 `renderer.js` 中切换

```javascript
const MyBackground = require('./backgrounds/MyBackground');
this.currentBackground = new MyBackground();
this.currentBackground.init(this.pixiApp, this.audioAnalyzer);
```

### 添加新的音乐风格

1. 在 `lyria_service.py` 中添加预设
2. Go Backend 调用 `/style` API
3. UI 显示风格变化提示

## 🎯 未来扩展

- [ ] 多主题背景切换
- [ ] SuperChat 弹幕系统
- [ ] 音乐播放器控制
- [ ] 用户设置持久化
- [ ] 多语言支持
- [ ] 移动端适配

---

**FlowRadio Team** © 2024

**系统状态**: ✅ 完全集成  
**版本**: 2.0.0  
**最后更新**: 2024-12-07
