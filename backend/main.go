package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
)

const (
	httpPort                = ":8080"  // HTTP + WebSocket 端口
	systemPromptFilePath    = "./llm_system_prompt.txt"
	initialHostPersonality  = "幽默"
	initialCurrentGenre     = "lofi"
	magentaServerIP         = "localhost"
)

// HostState 存储 DJ Brain 的当前状态
type HostState struct {
	Personality          string
	CurrentGenre         string
	ConversationHistory  []map[string]string
	LastMusicRequestTime time.Time // 上次请求音乐的时间
	LastSpeakTime        time.Time // 上次说话的时间
	mu                   sync.Mutex
}

// GlobalState 全局状态
type GlobalState struct {
	HostState    *HostState
	llmProxy     *DoubaoProxy
	magentaProxy *MagentaProxy
	WSManager    *WSClientManager // WebSocket 管理器
}

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	
	// 加载环境变量
	if err := godotenv.Load("../.env"); err != nil {
		log.Printf("⚠️ 未找到 .env 文件或加载失败: %v", err)
	}
	
	// [已移除] 不再加载 bili-coze-panel 下的 .env，避免覆盖主配置
	// if err := godotenv.Overload("../bili-coze-panel/.env"); err == nil {
	// 	log.Println("✅ 已加载 bili-coze-panel/.env 配置")
	// }

	log.Println("========================================")
	log.Println("     FlowRadio Backend 启动中...")
	log.Println("========================================")

	// 1. 初始化 WebSocket 管理器
	wsManager := NewWSClientManager()
	go wsManager.Run()

	// 2. 初始化全局状态
	hostState := &HostState{
		Personality:          initialHostPersonality,
		CurrentGenre:         initialCurrentGenre,
		ConversationHistory:  []map[string]string{},
		LastMusicRequestTime: time.Now(), // 初始化为当前时间
		LastSpeakTime:        time.Now(),
	}

	llmProxy := NewDoubaoProxy(systemPromptFilePath)
	magentaProxy := NewMagentaProxy(magentaServerIP)

	globalState := &GlobalState{
		HostState:    hostState,
		llmProxy:     llmProxy,
		magentaProxy: magentaProxy,
		WSManager:    wsManager,
	}

	// 显示运行模式
	log.Println("========================================")
	cozeToken := os.Getenv("COZE_API_TOKEN")
	if cozeToken != "" {
		log.Println("🤖 运行模式: Coze AI 工作流 (推荐)")
		log.Println("   - Main工作流: 音乐生成 + 主持人播报")
		log.Println("   - Comment Reply: 气氛组互动")
		if llmProxy != nil {
			log.Println("   - LLM回退: 已启用")
		} else {
			log.Println("   - LLM回退: 未配置")
		}
	} else {
		if llmProxy != nil {
			log.Println("🤖 运行模式: 豆包 LLM (基础模式)")
			log.Println("   ⚠️  建议配置 COZE_API_TOKEN 获得更好体验")
		} else {
			log.Println("❌ 错误: 未配置任何 AI 服务!")
			log.Println("   请配置以下任一选项:")
			log.Println("   1. COZE_API_TOKEN (推荐)")
			log.Println("   2. VOLCANO_API_KEY (回退)")
			log.Fatal("无法启动: 缺少必需的 API 配置")
		}
	}
	log.Println("========================================")

	// 3. 启动音频流转发器
	go globalState.runAudioStreamForwarder()

	// 4. 启动 Lyria 音乐生成
	go globalState.startLyriaMusicGeneration()

	// 5. 启动 Bilibili 爬虫监听器 (新增)
	go globalState.runBilibiliListener()

	// 6. 启动自动切歌检查器 (新增)
	go globalState.runAutoMusicChanger()

	// 7. 启动 HTTP + WebSocket 服务器
	startHTTPServer(globalState)
}

// runAutoMusicChanger 定期检查是否需要自动切歌
func (g *GlobalState) runAutoMusicChanger() {
	ticker := time.NewTicker(10 * time.Second)
	defer ticker.Stop()

	log.Println("⏰ 自动切歌检查器已启动")

	for range ticker.C {
		g.HostState.mu.Lock()
		lastMusic := g.HostState.LastMusicRequestTime
		lastSpeak := g.HostState.LastSpeakTime
		g.HostState.mu.Unlock()

		// 检查条件:
		// 1. 距离上次音乐请求超过 3 分钟
		// 2. 距离上次说话超过 10 秒 (避免打断)
		if time.Since(lastMusic) > 3*time.Minute {
			if time.Since(lastSpeak) > 10*time.Second {
				log.Printf("⏰ 触发自动切歌 (上次请求: %v, 上次说话: %v)", time.Since(lastMusic), time.Since(lastSpeak))
				
				// 更新时间防止重复触发
				g.HostState.mu.Lock()
				g.HostState.LastMusicRequestTime = time.Now()
				g.HostState.mu.Unlock()

				// 触发 Coze 工作流
				// 传入 Chat_trigger: true, 文本为空
				go g.handleUserInputWithCoze("", "System", true)
			}
		}
	}
}

// runBilibiliListener 监听 Bilibili 爬虫的 WebSocket
func (g *GlobalState) runBilibiliListener() {
	crawlerURL := "ws://localhost:3000" // 爬虫默认端口
	log.Printf("[BiliListener] 🎧 正在连接爬虫: %s", crawlerURL)

	for {
		// 使用 gorilla/websocket 作为客户端连接爬虫
		conn, _, err := websocket.DefaultDialer.Dial(crawlerURL, nil)
		if err != nil {
			// 连接失败，等待后重试 (静默重试，避免刷屏)
			time.Sleep(10 * time.Second)
			continue
		}

		log.Println("[BiliListener] ✅ 已连接到 Bilibili 爬虫")

		for {
			_, message, err := conn.ReadMessage()
			if err != nil {
				log.Printf("[BiliListener] ❌ 连接断开: %v", err)
				break
			}

			// 解析消息
			var msg map[string]interface{}
			if err := json.Unmarshal(message, &msg); err != nil {
				continue
			}

			// 调试: 打印所有收到的消息类型
			// log.Printf("[BiliListener] 收到消息类型: %v", msg["type"])

			// 处理总结消息 (danmuSummary)
			if msg["type"] == "danmuSummary" {
				log.Printf("[BiliListener] 🔍 检测到 danmuSummary 消息")
				
				// 调试 payload 类型
				// log.Printf("[BiliListener] Payload 类型: %T", msg["payload"])

				if payload, ok := msg["payload"].(map[string]interface{}); ok {
					if cozeText, ok := payload["cozeText"].([]interface{}); ok && len(cozeText) > 0 {
						// 提取总结文本
						summaryText := fmt.Sprintf("%v", cozeText[0])
						log.Printf("[BiliListener] 📝 收到总结: %s", summaryText)
						
						// 广播到前端 (让前端显示弹幕总结)
						g.WSManager.BroadcastMessage("DANMU_SUMMARY", map[string]interface{}{
							"text":     summaryText,
							"username": "弹幕分析师",
						})

						// 触发 Coze 工作流 (Chat_trigger = true)
						// 注意: 这里我们把总结文本作为 USER_INPUT 传入
						// 将用户名改为中文 "弹幕分析师" 以便 Coze 更好识别
						go g.handleUserInputWithCoze(summaryText, "弹幕分析师", true)
					} else {
						log.Printf("[BiliListener] ⚠️ danmuSummary 缺少 cozeText 或为空: %+v", payload)
					}
				} else {
					log.Printf("[BiliListener] ⚠️ danmuSummary payload 格式错误 (期望 map[string]interface{}): %T", msg["payload"])
				}
			}
		}
		conn.Close()
		time.Sleep(3 * time.Second)
	}
}

// 启动 HTTP + WebSocket 服务器
func startHTTPServer(state *GlobalState) {
	http.HandleFunc("/ws", state.WSManager.HandleWebSocket(state))
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	log.Printf("✅ HTTP + WebSocket 服务器运行在 %s", httpPort)
	if err := http.ListenAndServe(httpPort, nil); err != nil {
		log.Fatalf("❌ HTTP 服务器启动失败: %v", err)
	}
}

// 启动 Lyria 音乐生成
func (g *GlobalState) startLyriaMusicGeneration() {
	log.Println("[Lyria] 正在启动 Lyria 音乐生成...")
	time.Sleep(2 * time.Second)

	url := fmt.Sprintf("http://%s:8000/start", magentaServerIP)
	resp, err := http.Post(url, "application/json", nil)
	if err != nil {
		log.Printf("[Lyria] 启动失败: %v", err)
		return
	}
	defer resp.Body.Close()

	log.Println("[Lyria] 音乐生成已启动 ✓")
}

// 音频流转发器 (广播到 WebSocket)
func (g *GlobalState) runAudioStreamForwarder() {
	log.Println("--- 音频流转发器启动 ---")
	
	reconnectDelay := 5 * time.Second
	consecutiveErrors := 0

	for {
		log.Printf("[AudioForwarder] 🔌 连接到 Lyria 音频流...")
		stream, err := g.magentaProxy.GetAudioStream(context.Background())
		if err != nil {
			consecutiveErrors++
			delay := reconnectDelay * time.Duration(consecutiveErrors)
			if delay > 30*time.Second {
				delay = 30 * time.Second // 最多30秒
			}
			log.Printf("[AudioForwarder] ❌ 连接失败 (%v后重试): %v", delay, err)
			time.Sleep(delay)
			continue
		}

		log.Println("[AudioForwarder] ✅ 音频流已连接")
		consecutiveErrors = 0 // 重置错误计数
		
		buf := make([]byte, 4096)
		idleCount := 0 // 空闲读取计数
		lastDataTime := time.Now()
		
		for {
			// 设置读取超时 (避免永久阻塞)
			// stream.SetReadDeadline(time.Now().Add(10 * time.Second))
			
			n, err := stream.Read(buf)
			if err != nil {
				if err != io.EOF {
					log.Printf("[AudioForwarder] ⚠️ 读取流断开: %v", err)
				} else {
					log.Println("[AudioForwarder] 📡 流正常结束 (EOF)")
				}
				stream.Close()
				
				// 判断是否需要延迟重连
				timeSinceLastData := time.Since(lastDataTime)
				if timeSinceLastData < 2*time.Second {
					// 数据流刚中断,立即重连
					log.Println("[AudioForwarder] 🔄 立即重连 (刚有数据)")
				} else {
					// 长时间无数据,可能是空闲,延迟重连
					log.Printf("[AudioForwarder] 💤 空闲超过 %.1fs,等待3秒后重连", timeSinceLastData.Seconds())
					time.Sleep(3 * time.Second)
				}
				break
			}

			if n > 0 {
				lastDataTime = time.Now()
				idleCount = 0
				
				chunkData := make([]byte, n)
				copy(chunkData, buf[:n])

				// 广播到 WebSocket 客户端
				g.WSManager.BroadcastAudioChunk(chunkData)
			} else {
				idleCount++
				// 连续空读取,短暂休眠
				if idleCount > 10 {
					time.Sleep(100 * time.Millisecond)
				}
			}
		}
	}
}
