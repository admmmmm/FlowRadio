# 🎙️ FlowRadio - AI 音乐电台

<div align="center">

**一个由 AI 驱动的互动音乐电台系统**

融合实时音乐生成、AI 主持人播报、智能气氛组互动

[![Google Gemini](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?logo=google)](https://ai.google.dev/)
[![Coze AI](https://img.shields.io/badge/AI-Coze%20Workflow-7C3AED)](https://www.coze.cn/)
[![Lyria](https://img.shields.io/badge/Music-Lyria%20API-FF6B6B)](https://deepmind.google/discover/blog/lyria-googles-most-advanced-ai-music-generation-model/)

</div>

---

## ✨ 核心特性

### 🎵 实时音乐生成
- **Google Lyria API** - DeepMind 最先进的音乐生成模型
- **48kHz 立体声** - 高质量音频输出
- **动态风格切换** - 支持数百种音乐风格和情绪
- **平滑过渡** - 智能音乐衔接,无缝切换

### 🤖 AI 主持人系统
- **Coze 工作流驱动** - 智能主持人播报
- **音乐参数解析** - 自动提取 BPM、调性、风格
- **个性化播报** - 专业 DJ 风格解说
- **TTS 语音合成** - 自然流畅的语音播报

### 💬 智能气氛组
- **互动评论系统** - AI 模拟真实听众互动
- **自动回复** - 智能回应用户评论
- **情绪识别** - 根据音乐风格调整评论内容
- **弹幕显示** - 6 轨道防碰撞弹幕系统

### 🎨 精美 UI
- **Electron 桌面应用** - 跨平台支持
- **Synthwave 主题** - 赛博朋克风格界面
- **实时弹幕** - 4 种弹幕类型(用户/气氛组/回复/主持人)
- **音乐参数显示** - 实时显示当前音乐信息

---

## 🏗️ 系统架构

```
┌─────────────────────────────────────────────────────────┐
│                    Electron UI (前端)                    │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  用户输入   │  │  音频播放器  │  │  弹幕系统     │  │
│  └──────┬──────┘  └──────▲───────┘  └───────▲───────┘  │
└─────────┼────────────────┼──────────────────┼───────────┘
          │ WebSocket      │ Audio Chunks     │ Messages
          ▼                ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                   Go Backend (后端)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ WebSocket    │  │ Coze Client  │  │ Audio        │  │
│  │ Hub          │  │              │  │ Forwarder    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────▲───────┘  │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │ User Input       │ Workflow Call    │ Stream
          ▼                  ▼                  │
┌──────────────────┐  ┌──────────────────┐     │
│   Coze API       │  │ Lyria Service    │◄────┘
│  (AI Workflow)   │  │  (Python)        │
│  ┌────────────┐  │  │  ┌────────────┐  │
│  │ Main       │  │  │  │ Gemini API │  │
│  │ Workflow   │  │  │  │ (Lyria)    │  │
│  └────────────┘  │  │  └────────────┘  │
│  ┌────────────┐  │  │  ┌────────────┐  │
│  │ Comment    │  │  │  │ Audio      │  │
│  │ Reply      │  │  │  │ Buffer     │  │
│  └────────────┘  │  │  └────────────┘  │
└──────────────────┘  └──────────────────┘
```

### 技术栈

| 组件 | 技术 | 说明 |
|------|------|------|
| **前端** | Electron + Vanilla JS | 桌面应用,原生性能 |
| **后端** | Go 1.21+ | 高性能 WebSocket 服务器 |
| **音乐服务** | Python 3.10+ | Lyria API 封装 |
| **AI 引擎** | Coze Workflow | 主持人 + 气氛组 AI |
| **音乐生成** | Google Lyria | 实时音乐生成 |
| **通信协议** | WebSocket | 实时双向通信 |

---

## 🚀 快速开始

### 前置要求

- **Python 3.10+** - Lyria 服务
- **Go 1.21+** - 后端服务器
- **Node.js 16+** - Electron 前端
- **API Keys**:
  - ✅ **GEMINI_API_KEY** (必需) - [申请地址](https://aistudio.google.com/app/apikey)
  - ⭐ **COZE_API_TOKEN** (推荐) - [申请地址](https://www.coze.cn/open/oauth/pats)

### 一键启动 (Windows)

```powershell
# 1. 克隆项目
git clone https://github.com/admmmmm/FlowRadio.git
cd FlowRadio

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件,填入你的 API Keys

# 3. 一键启动 (自动启动所有服务)
.\start.ps1
```

### 手动启动

#### 1️⃣ 安装依赖

```powershell
# Python 依赖 (Lyria 服务)
pip install flask google-genai numpy requests

# Go 依赖 (后端)
cd backend
go mod download
cd ..

# Electron 依赖 (前端)
cd electron-ui
npm install
cd ..
```

#### 2️⃣ 启动服务

```powershell
# 终端 1: Lyria 音乐服务 (端口 8000)
python lyria_service.py

# 终端 2: Go 后端服务 (端口 8080)
cd backend
go run .

# 终端 3: Electron 前端
cd electron-ui
npm start
```

---

## ⚙️ 配置说明

### 环境变量 (`.env`)

```env
# ===== 必需配置 =====
# Google Gemini API (用于 Lyria 音乐生成)
GEMINI_API_KEY=your_gemini_api_key_here

# ===== 推荐配置 =====
# Coze API Token (AI DJ 工作流)
COZE_API_TOKEN=your_coze_api_token_here

# Coze 工作流 ID (已配置,无需修改)
COZE_MAIN_WORKFLOW_ID=7580359385462505491
COZE_COMMENT_REPLY_WORKFLOW_ID=7580359385462521875

# ===== 可选配置 (Fallback) =====
# 火山引擎豆包 API (仅在未配置 Coze 时使用)
VOLCANO_API_KEY=your_volcano_api_key_here
VOLCANO_ENDPOINT_ID=your_endpoint_id_here
```

### 端口配置

| 服务 | 默认端口 | 说明 |
|------|---------|------|
| Lyria 服务 | 8000 | HTTP API |
| Go 后端 | 8080 | WebSocket 服务器 |
| Electron UI | - | 桌面应用 |

---

## 🎮 使用指南

### 基础操作

1. **启动应用** - 运行 `.\start.ps1`
2. **连接状态** - 查看右上角连接指示灯 (绿色=已连接)
3. **输入请求** - 在底部输入框输入音乐风格,如 "jazz"、"摇滚乐"
4. **发送请求** - 点击箭头按钮或按 Enter 发送
5. **观看弹幕** - AI 主持人和气氛组会自动互动

### 高级功能

#### 🎛️ Lyria 调试面板
- 点击右上角 ⚙️ 按钮打开
- 手动调整音乐参数:
  - **Genre** (风格): jazz, rock, electronic...
  - **Instrument** (乐器): piano, guitar, synth...
  - **Mood** (情绪): happy, sad, energetic...
  - **BPM**: 60-180
  - **Duration**: 音乐时长(秒)

#### 💬 弹幕系统
- **用户弹幕** (蓝色渐变) - 你的评论
- **气氛组** (紫色渐变) - AI 模拟听众
- **主持人** (金色渐变) - AI DJ 播报
- **回复** (绿色渐变) - AI 回复评论

---

## 🔧 故障排查

### 音频无法播放

**症状**: Lyria 服务频繁连接断开

**排查步骤**:
1. 检查 `GEMINI_API_KEY` 是否正确设置
2. 查看 Lyria 服务终端日志:
   ```
   ✅ Lyria 会话自动启动成功!  ← 正常
   ❌ 连接错误: ...              ← API Key 问题
   ```
3. 手动测试 Lyria:
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:8000/status" -Method GET
   ```

**解决方案**:
- 验证 API Key 有效性
- 检查网络代理设置
- 重启 Lyria 服务

### WebSocket 连接失败

**症状**: 前端显示 "连接失败"

**排查步骤**:
1. 确认 Go 后端已启动 (端口 8080)
2. 检查防火墙设置
3. 查看后端日志是否有错误

**解决方案**:
```powershell
# 重启后端服务
cd backend
go run .
```

### Coze 工作流超时

**症状**: "context deadline exceeded"

**原因**: 网络延迟或 Coze API 响应慢

**解决方案**:
- 已优化超时时间到 120 秒
- 检查网络连接
- 重试请求

---

## 📝 API 文档

### Lyria 音乐服务 (Python)

#### `POST /start`
启动 Lyria 会话

**响应**:
```json
{
  "message": "Lyria 会话已启动",
  "state": "loading"
}
```

#### `POST /style`
设置音乐风格

**请求体**:
```json
{
  "genre": ["jazz", "lofi"],
  "instrument": ["piano"],
  "mood": ["relaxing"],
  "bpm": 90,
  "duration": 60
}
```

#### `GET /stream`
获取音频流 (48kHz 立体声 PCM)

**响应头**:
```
X-Sample-Rate: 48000
X-Channels: 2
X-Bit-Depth: 16
X-Format: Interleaved PCM
```

#### `GET /status`
获取播放状态

**响应**:
```json
{
  "state": "playing",
  "buffer_size": 45,
  "current_prompts": [...]
}
```

### Go 后端 WebSocket

#### 连接
```
ws://localhost:8080/ws
```

#### 消息类型

**客户端 → 服务器**:
```json
{
  "type": "USER_INPUT",
  "data": {
    "text": "来点爵士乐"
  }
}
```

**服务器 → 客户端**:

| 类型 | 说明 | 数据结构 |
|------|------|----------|
| `HOST_MESSAGE` | 主持人播报 | `{dj_message, music_params}` |
| `MUSIC_PARAMS` | 音乐参数 | `{music_config, weighted_prompts}` |
| `ATMOSPHERE` | 气氛组 | `{comments, reply, tts_url}` |
| `AUDIO_CHUNK` | 音频数据 | `{chunk: base64}` |

---

## 🎨 自定义主题

编辑 `electron-ui/style.css` 修改 UI 样式:

```css
/* Synthwave 主题颜色 */
:root {
  --bg-primary: #1a0033;
  --bg-secondary: #2d1b4e;
  --accent-pink: #ff006e;
  --accent-cyan: #00f5ff;
  --accent-purple: #8338ec;
}
```

---

## 📊 性能优化

### 音频优化
- ✅ **批量发送** - 4 个音频块合并 (减少网络开销)
- ✅ **预缓冲** - 前端积累 10 个块再播放 (210ms 缓冲)
- ✅ **AudioContext 优化** - `playback` 模式,更大缓冲区
- ✅ **时间漂移处理** - 智能时间调度,避免卡顿

### 网络优化
- ✅ **智能重连** - 指数退避策略 (5s → 30s)
- ✅ **连接状态检测** - 区分有数据/空闲断开
- ✅ **超时优化** - Coze API 超时 120 秒
- ✅ **错误恢复** - 自动重试机制

### UI 优化
- ✅ **弹幕防碰撞** - 6 轨道智能分配
- ✅ **批量渲染** - 减少 DOM 操作
- ✅ **CSS 动画** - GPU 加速

---

## 🛠️ 开发指南

### 项目结构

```
FlowRadio/
├── backend/                 # Go 后端服务
│   ├── main.go             # 主程序入口
│   ├── websocket_handler.go # WebSocket 处理
│   ├── coze_client.go      # Coze API 客户端
│   ├── magenta_proxy.go    # Lyria 代理
│   └── llm_proxy.go        # LLM Fallback
├── electron-ui/             # Electron 前端
│   ├── main.js             # Electron 主进程
│   ├── renderer.js         # 渲染进程逻辑
│   ├── index.html          # UI 界面
│   └── style.css           # 样式表
├── lyria_service.py        # Lyria 音乐服务
├── start.ps1               # 一键启动脚本
├── .env.example            # 环境变量模板
└── README.md               # 本文件
```

### 添加新功能

#### 1. 添加新的 WebSocket 消息类型

**后端** (`backend/websocket_handler.go`):
```go
case "NEW_MESSAGE_TYPE":
    data := msg["data"].(map[string]interface{})
    // 处理逻辑
    g.WSManager.BroadcastMessage("NEW_RESPONSE", data)
```

**前端** (`electron-ui/renderer.js`):
```javascript
case 'NEW_RESPONSE':
    handleNewResponse(data);
    break;
```

#### 2. 自定义 Coze 工作流

1. 在 [Coze 平台](https://www.coze.cn/) 创建新工作流
2. 获取工作流 ID
3. 更新 `.env` 配置
4. 修改 `backend/coze_client.go` 调用逻辑

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request!

### 提交流程
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

- **Google DeepMind** - [Lyria 音乐生成模型](https://deepmind.google/discover/blog/lyria-googles-most-advanced-ai-music-generation-model/)
- **Google Gemini** - [Gemini API](https://ai.google.dev/)
- **Coze** - [AI 工作流平台](https://www.coze.cn/)
- **Electron** - [跨平台桌面应用框架](https://www.electronjs.org/)

---

## 📮 联系方式

- **GitHub**: [@admmmmm](https://github.com/admmmmm)
- **项目主页**: [FlowRadio](https://github.com/admmmmm/FlowRadio)
- **问题反馈**: [Issues](https://github.com/admmmmm/FlowRadio/issues)

---

<div align="center">

**享受 AI 音乐电台的乐趣!** 🎵

如果觉得有用,请给个 ⭐ Star!

</div>
