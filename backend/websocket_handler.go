package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // 允许所有来源 (开发环境)
	},
}

// WebSocket 客户端管理
type WSClientManager struct {
	clients   map[*websocket.Conn]bool
	broadcast chan []byte
	register  chan *websocket.Conn
	unregister chan *websocket.Conn
	mu        sync.Mutex
}

func NewWSClientManager() *WSClientManager {
	return &WSClientManager{
		clients:    make(map[*websocket.Conn]bool),
		broadcast:  make(chan []byte, 256),
		register:   make(chan *websocket.Conn),
		unregister: make(chan *websocket.Conn),
	}
}

func (m *WSClientManager) Run() {
	for {
		select {
		case client := <-m.register:
			m.mu.Lock()
			m.clients[client] = true
			m.mu.Unlock()
			log.Printf("✅ WebSocket 客户端已连接 (总数: %d)", len(m.clients))

		case client := <-m.unregister:
			m.mu.Lock()
			if _, ok := m.clients[client]; ok {
				delete(m.clients, client)
				client.Close()
			}
			m.mu.Unlock()
			log.Printf("❌ WebSocket 客户端已断开 (总数: %d)", len(m.clients))

		case message := <-m.broadcast:
			m.mu.Lock()
			for client := range m.clients {
				err := client.WriteMessage(websocket.TextMessage, message)
				if err != nil {
					log.Printf("❌ 发送消息失败: %v", err)
					client.Close()
					delete(m.clients, client)
				}
			}
			m.mu.Unlock()
		}
	}
}

// 广播消息给所有 WebSocket 客户端
func (m *WSClientManager) BroadcastMessage(msgType string, data interface{}) {
	message := map[string]interface{}{
		"type": msgType,
		"data": data,
	}
	jsonData, err := json.Marshal(message)
	if err != nil {
		log.Printf("❌ JSON 序列化失败: %v", err)
		return
	}
	m.broadcast <- jsonData
}

// WebSocket 处理函数
func (m *WSClientManager) HandleWebSocket(globalState *GlobalState) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Printf("❌ WebSocket 升级失败: %v", err)
			return
		}

		m.register <- conn

		// 读取客户端消息
		go func() {
			defer func() {
				m.unregister <- conn
			}()

			for {
				_, message, err := conn.ReadMessage()
				if err != nil {
					break
				}

				// 解析客户端消息
				var msg map[string]interface{}
				if err := json.Unmarshal(message, &msg); err != nil {
					log.Printf("❌ 解析客户端消息失败: %v", err)
					continue
				}

				// 处理用户输入
				if msg["type"] == "USER_INPUT" {
					if data, ok := msg["data"].(map[string]interface{}); ok {
						if text, ok := data["text"].(string); ok {
							go globalState.handleUserInput(text)
						}
					}
				}

				// 处理 Coze 工作流的音乐更新请求
				if msg["type"] == "UPDATE_MUSIC" {
					if data, ok := msg["data"].(map[string]interface{}); ok {
						go globalState.handleMusicUpdate(data)
					}
				}
			}
		}()
	}
}

// 处理用户输入 (优先使用 Coze 工作流)
func (g *GlobalState) handleUserInput(userText string) {
	log.Printf("📥 收到用户输入: %s", userText)

	// 检查是否启用 Coze
	cozeToken := os.Getenv("COZE_API_TOKEN")
	useCoze := cozeToken != ""

	if useCoze {
		// 使用 Coze 工作流
		log.Println("🎯 使用 Coze 工作流处理请求")
		g.handleUserInputWithCoze(userText)
	} else {
		// 回退到传统 LLM
		log.Println("🔄 使用传统 LLM 处理请求")
		g.handleUserInputWithLLM(userText)
	}
}

// 使用 Coze 工作流处理用户输入
func (g *GlobalState) handleUserInputWithCoze(userText string) {
	client := NewCozeClient()

	// 调用 Main 工作流
	result, err := client.GenerateMusicAndAtmosphere(
		userText,
		"用户在线听歌", // 上下文
		true,           // 启用气氛组
	)

	if err != nil {
		log.Printf("❌ Coze 工作流调用失败: %v", err)
		g.WSManager.BroadcastMessage("SYSTEM_STATUS", map[string]interface{}{
			"message": "Coze 调用失败: " + err.Error(),
		})
		// 回退到传统 LLM
		g.handleUserInputWithLLM(userText)
		return
	}

	// 1. 广播主持人播报
	g.WSManager.BroadcastMessage("HOST_MESSAGE", map[string]interface{}{
		"script":  result.HostScript,
		"tts_url": result.HostTTSURL,
		"source":  "Coze Main工作流",
	})

	// 2. 发送音乐参数到 Lyria
	if result.MusicParams != nil {
		// 转换为 map 以便发送
		musicData := map[string]interface{}{
			"music_config":      result.MusicParams.MusicConfig,
			"weighted_prompts": result.MusicParams.WeightedPrompts,
			"reasoning":        result.MusicParams.Reasoning,
		}

		g.WSManager.BroadcastMessage("MUSIC_PARAMS", musicData)

		// 调用 Lyria API
		g.updateLyriaWithMusicParams(result.MusicParams)
	}

	// 3. 广播气氛组内容
	if result.Atmosphere != nil {
		g.WSManager.BroadcastMessage("ATMOSPHERE", map[string]interface{}{
			"comments":     result.Atmosphere.Comments,
			"long_comment": result.Atmosphere.LongComment,
			"reply":        result.Atmosphere.Reply,
			"tts_url":      result.Atmosphere.TTSURL,
		})
	}
}

// 使用传统 LLM 处理用户输入
func (g *GlobalState) handleUserInputWithLLM(userText string) {
	// 检查 LLM 代理是否可用
	if g.llmProxy == nil {
		log.Println("❌ LLM 回退模式不可用 (VOLCANO_API_KEY 未配置)")
		g.WSManager.BroadcastMessage("SYSTEM_STATUS", map[string]interface{}{
			"message": "❌ LLM 回退模式不可用\n\n请配置以下任一选项:\n1. COZE_API_TOKEN (推荐)\n2. VOLCANO_API_KEY (回退)",
			"error":   true,
		})
		return
	}

	g.HostState.mu.Lock()
	conversationHistory := g.HostState.ConversationHistory
	currentGenre := g.HostState.CurrentGenre
	g.HostState.mu.Unlock()

	// 调用 LLM 获取决策
	decision, err := g.llmProxy.GetDJDecision(userText, currentGenre, conversationHistory)
	if err != nil {
		log.Printf("❌ LLM 调用失败: %v", err)
		g.WSManager.BroadcastMessage("SYSTEM_STATUS", map[string]interface{}{
			"message": "LLM 调用失败: " + err.Error(),
		})
		return
	}

	// 更新状态
	g.HostState.mu.Lock()
	g.HostState.ConversationHistory = decision.NewConversationMemory
	if len(decision.MusicPrompts) > 0 {
		g.HostState.CurrentGenre = decision.MusicPrompts[0]
	}
	g.HostState.mu.Unlock()

	// 广播 DJ 决策
	g.WSManager.BroadcastMessage("DJ_DECISION", map[string]interface{}{
		"dj_script":     decision.DJScript,
		"music_prompts": decision.MusicPrompts,
		"action_reason": decision.ActionReason,
		"audio_url":     decision.AudioURL, // TTS 音频 URL (如果有)
	})

	// 切换音乐风格
	var newPrompt string
	if len(decision.MusicPrompts) > 0 && decision.MusicPrompts[0] != "" {
		newPrompt = decision.MusicPrompts[0] // 使用第一个提示词
	} else {
		// 如果 LLM 没有返回新提示词,使用当前风格
		newPrompt = currentGenre
		if newPrompt == "" {
			newPrompt = "lofi chill beats" // 默认风格
		}
	}

	// 广播 LLM → Lyria 的消息到调试面板
	g.WSManager.BroadcastMessage("LLM_TO_LYRIA", map[string]interface{}{
		"prompt": newPrompt,
		"source": "豆包 LLM",
		"target": "Lyria Music API",
		"note":   fmt.Sprintf("原始提示词: %v", decision.MusicPrompts),
	})

	if err := g.magentaProxy.SetStyle(newPrompt); err != nil {
		log.Printf("❌ 切换音乐风格失败: %v", err)
		g.WSManager.BroadcastMessage("SYSTEM_STATUS", map[string]interface{}{
			"message": "切换音乐风格失败: " + err.Error(),
		})
	} else {
		log.Printf("🎨 音乐风格已切换: %s", newPrompt)
	}
}

// 处理 Coze 工作流的音乐更新请求
func (g *GlobalState) handleMusicUpdate(data map[string]interface{}) {
	log.Printf("🎵 收到 Coze 音乐更新请求")

	// 新格式: 直接传递完整的音乐参数给 Lyria
	// data 包含: genre, instrument, mood, theme, bpm, duration 等
	
	// 提取参数
	var displayText string
	if genre, ok := data["genre"].([]interface{}); ok && len(genre) > 0 {
		if str, ok := genre[0].(string); ok {
			displayText = str
		}
	}
	
	reasoning := ""
	if r, ok := data["reasoning"].(string); ok {
		reasoning = r
	}

	// 更新状态
	if displayText != "" {
		g.HostState.mu.Lock()
		g.HostState.CurrentGenre = displayText
		g.HostState.mu.Unlock()
	}

	// 广播 Coze → Lyria 消息
	g.WSManager.BroadcastMessage("LLM_TO_LYRIA", map[string]interface{}{
		"source":    "Coze 工作流",
		"target":    "Lyria Music API",
		"reasoning": reasoning,
		"params":    data,
	})

	// 调用 Lyria API - 传递完整的参数对象
	lyriaResp, err := g.magentaProxy.SetStyleWithParams(data)
	if err != nil {
		log.Printf("❌ 切换音乐风格失败: %v", err)
		g.WSManager.BroadcastMessage("SYSTEM_STATUS", map[string]interface{}{
			"message": "切换音乐风格失败: " + err.Error(),
		})
		// 发送错误响应到前端调试面板
		g.WSManager.BroadcastMessage("LYRIA_RESPONSE", map[string]interface{}{
			"success": false,
			"error":   err.Error(),
			"params":  data,
		})
	} else {
		log.Printf("🎨 音乐参数已更新 (Coze): Genre=%v, BPM=%v", data["genre"], data["bpm"])
		// 发送成功响应到前端调试面板
		g.WSManager.BroadcastMessage("LYRIA_RESPONSE", map[string]interface{}{
			"success":  true,
			"response": lyriaResp,
			"params":   data,
		})
	}
}

// 使用音乐参数更新 Lyria
func (g *GlobalState) updateLyriaWithMusicParams(musicParams *MusicParams) {
	if musicParams == nil {
		return
	}

	// 构建 Lyria 提示词
	var prompts []string
	for _, wp := range musicParams.WeightedPrompts {
		prompts = append(prompts, wp.Text)
	}

	// 合并提示词
	mainPrompt := ""
	if len(prompts) > 0 {
		mainPrompt = prompts[0]
		for i := 1; i < len(prompts); i++ {
			mainPrompt += ", " + prompts[i]
		}
	}

	if mainPrompt == "" {
		mainPrompt = "lofi chill beats" // 默认
	}

	log.Printf("🎵 发送到 Lyria: %s (BPM: %d)", mainPrompt, musicParams.MusicConfig.BPM)

	// 广播调试信息
	g.WSManager.BroadcastMessage("LLM_TO_LYRIA", map[string]interface{}{
		"prompt":       mainPrompt,
		"source":       "Coze Main工作流",
		"target":       "Lyria Music API",
		"music_config": musicParams.MusicConfig,
		"reasoning":    musicParams.Reasoning,
	})

	// 调用 Lyria
	if err := g.magentaProxy.SetStyle(mainPrompt); err != nil {
		log.Printf("❌ 切换音乐风格失败: %v", err)
		g.WSManager.BroadcastMessage("SYSTEM_STATUS", map[string]interface{}{
			"message": "切换音乐风格失败: " + err.Error(),
		})
	} else {
		log.Printf("🎨 音乐风格已切换: %s", mainPrompt)
	}
}

// 转发音频块到 WebSocket 客户端
func (m *WSClientManager) BroadcastAudioChunk(audioData []byte) {
	// 将二进制音频数据编码为 base64
	base64Audio := base64.StdEncoding.EncodeToString(audioData)
	m.BroadcastMessage("AUDIO_CHUNK", base64Audio)
}
