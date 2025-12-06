# FlowRadio - AI DJ 电台

基于 Lyria 音乐生成 + Coze AI 工作流的智能电台系统

## 环境需求

### 必需软件

- **Python 3.10+** - Lyria音乐生成服务
  - 安装地址: https://www.python.org/downloads/
  
- **Go 1.21+** - WebSocket后端服务
  - 安装地址: https://go.dev/dl/
  
- **Node.js 18+** - Electron前端UI
  - 安装地址: https://nodejs.org/

### Python依赖

```bash
pip install google-genai flask numpy
```

或使用项目的requirements.txt (如果有):
```bash
pip install -r requirements.txt
```

### API密钥 (必需)

1. **GEMINI_API_KEY** (必需)
   - 用于Lyria音乐生成
   - 获取地址: https://aistudio.google.com/app/apikey

2. **COZE_API_TOKEN** (推荐)
   - 用于AI主持人和气氛组功能
   - 获取地址: https://www.coze.cn/open/oauth/pats
   - 如不配置,将使用Doubao LLM回退模式

3. **VOLCANO_API_KEY** (可选)
   - 仅在未配置Coze时需要
   - 用于Doubao LLM回退模式
   - 获取地址: https://console.volcengine.com/ark/

### 配置步骤

1. 复制环境变量模板:
   ```powershell
   Copy-Item .env.example .env
   ```

2. 编辑 `.env` 文件,填入你的API密钥:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   COZE_API_TOKEN=your_coze_token_here
   ```

3. 安装Node.js依赖:
   ```powershell
   cd electron-ui
   npm install
   ```

## 快速开始

### 一键启动

```powershell
.\start.ps1
```

### 手动启动

1. 启动 Lyria 服务: `python lyria_service.py`
2. 启动 Go 后端: `cd backend; go run .`
3. 启动 Electron UI: `cd electron-ui; npm start`

## 项目结构

### 根目录

- **lyria_service.py** - Lyria音乐生成服务,基于Gemini API生成48kHz立体声音乐流
- **start.ps1** - 一键启动脚本,自动加载环境变量并启动所有服务
- **.env** - 环境变量配置文件,包含API密钥
- **.env.example** - 环境变量配置模板
- **README.md** - 项目说明文档

### backend/

Go语言WebSocket服务器,连接前端和各个AI服务

- **main.go** - 主程序入口,初始化HTTP服务器和WebSocket
- **websocket_handler.go** - WebSocket消息处理,转发用户请求到Coze和Lyria
- **coze_client.go** - Coze工作流客户端,调用Main和CommentReply工作流
- **llm_proxy.go** - Doubao LLM代理,用于Coze不可用时的回退模式
- **magenta_proxy.go** - Magenta音乐参数生成(备用)
- **llm_system_prompt.txt** - LLM系统提示词
- **go.mod** / **go.sum** - Go依赖管理
- **proto/** - gRPC协议定义(未使用)

### electron-ui/

Electron桌面应用前端

- **main.js** - Electron主进程,创建窗口
- **index.html** - UI界面结构
- **renderer.js** - 渲染进程逻辑,WebSocket通信、音频播放、弹幕系统
- **style.css** - 界面样式
- **package.json** - Node.js依赖配置

## 系统架构

```
用户输入 → Electron UI
           ↓ WebSocket
        Go后端 (8080)
           ↓
    ┌──────┴──────┐
    ↓             ↓
Coze工作流    Lyria服务 (8000)
    ↓             ↓
主持人播报    音乐生成
气氛组评论    48kHz流式传输
```

## 环境变量

在 `.env` 文件中配置:

```env
GEMINI_API_KEY=your_gemini_key        # Lyria音乐生成
COZE_API_TOKEN=your_coze_token        # Coze工作流
USE_COZE=true                         # 启用Coze模式
```

## 核心功能

### Coze工作流

- **Main工作流** - 根据用户输入生成音乐参数和主持人播报
- **Comment Reply工作流** - 生成气氛组评论和主持人回复

### 智能模式切换

- 有COZE_API_TOKEN时使用Coze工作流
- 无Token时回退到Doubao LLM

### 音频播放

- 48kHz立体声音频流
- 预缓冲机制减少卡顿
- 实时流式播放

### 弹幕系统

- 6轨道防碰撞
- 4种弹幕类型(用户/气氛组/回复/主持人)
- 12秒动画时长

## 技术栈

- **Go** - WebSocket服务器
- **Python** - Lyria音乐生成服务
- **Electron** - 桌面应用
- **Coze** - AI工作流平台
- **Gemini Lyria** - 音乐生成API
