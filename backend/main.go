package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

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
	Personality         string
	CurrentGenre        string
	ConversationHistory []map[string]string
	mu                  sync.Mutex
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

	log.Println("========================================")
	log.Println("     FlowRadio Backend 启动中...")
	log.Println("========================================")

	// 1. 初始化 WebSocket 管理器
	wsManager := NewWSClientManager()
	go wsManager.Run()

	// 2. 初始化全局状态
	hostState := &HostState{
		Personality:         initialHostPersonality,
		CurrentGenre:        initialCurrentGenre,
		ConversationHistory: []map[string]string{},
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

	// 5. 启动 HTTP + WebSocket 服务器
	startHTTPServer(globalState)
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
