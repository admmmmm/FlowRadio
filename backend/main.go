package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"strings"
	"sync"
	"time"

	pb "flowradio/backend/proto" 

	"google.golang.org/grpc"
	// "google.golang.org/grpc/codes"
	// "google.golang.org/grpc/status"
)

const (
	port                   = ":50051"
	systemPromptFilePath   = "./llm_system_prompt.txt"
	initialHostPersonality = "幽默" // 初始主持人性格
	initialCurrentGenre    = "lofi" // 初始流派
)

// HostState 存储 DJ Brain 的当前状态和多轮对话记忆
type HostState struct {
	Personality         string                       // 主持人当前人格
	CurrentGenre        string                       // 当前播放流派 (用于 LLM 决策)
	ConversationHistory []map[string]string          // 存储 LLM User/Assistant 对话历史 (JSON 格式)
	mu                  sync.Mutex                   // 保护并发访问
}

// GlobalState 存储服务器所有全局状态和代理
type GlobalState struct {
	HostState *HostState
	llmProxy  *DoubaoProxy                     // LLM 代理
	// TODO: Add TTS Proxy, Magenta Proxy

	// 广播通道：用于将更新从 DJ Brain 推送到所有 StreamUpdates 连接
	BroadcastChannel chan *pb.UpdateMessage 
}

// server 结构体是 gRPC 服务的具体实现
type server struct {
	pb.UnimplementedFlowRadioServiceServer 
	*GlobalState // 嵌入全局状态
	clients      map[string]chan *pb.UpdateMessage // 实时连接的客户端通道
	clientMux    sync.Mutex
}

// NewServer 初始化服务器和所有全局状态
func NewServer() *server {
	// 1. 初始化 Host State
	initialState := &HostState{
		Personality:         initialHostPersonality,
		CurrentGenre:        initialCurrentGenre,
		ConversationHistory: make([]map[string]string, 0),
	}

	// 2. 初始化全局状态和代理
	globalState := &GlobalState{
		HostState:        initialState,
		llmProxy:         NewDoubaoProxy(systemPromptFilePath), // 初始化 LLM 代理
		BroadcastChannel: make(chan *pb.UpdateMessage, 100),    // 初始化广播通道
	}

	// 3. 初始化 server
	s := &server{
		GlobalState: globalState,
		clients:     make(map[string]chan *pb.UpdateMessage),
	}

	// 4. 启动后台 Goroutines
	go s.runBroadcastManager()
	go s.runVirtualCommentGenerator()
	
	return s
}

// runBroadcastManager 负责从 BroadcastChannel 接收消息，并推送给所有连接的客户端
func (s *server) runBroadcastManager() {
	log.Println("--- 广播管理器启动 ---")
	for update := range s.BroadcastChannel {
		s.clientMux.Lock()
		for clientID, clientChan := range s.clients {
			// 使用 select default 避免单个阻塞客户端卡住整个广播
			select {
			case clientChan <- update:
				// 成功发送
			default:
				// 客户端通道满或阻塞，移除客户端
				log.Printf("客户端 %s 通道阻塞，断开连接。", clientID)
				close(clientChan)
				delete(s.clients, clientID)
			}
		}
		s.clientMux.Unlock()
	}
}

// runVirtualCommentGenerator 定时生成虚拟留言并推送到广播通道
func (s *server) runVirtualCommentGenerator() {
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()
	
	for range ticker.C {
		// 构造虚拟留言
		s.HostState.mu.Lock()
		currentGenre := s.HostState.CurrentGenre
		s.HostState.mu.Unlock()

		commentText := fmt.Sprintf("虚拟听众留言：这首 %s 太棒了，真适合摸鱼！", currentGenre)

		virtualComment := &pb.UpdateMessage{
			Type: pb.UpdateMessage_VIRTUAL_COMMENT,
			TimestampMs: time.Now().UnixMilli(),
			Payload: &pb.UpdateMessage_VirtualCommentText{VirtualCommentText: commentText},
		}
		
		// 推送给广播通道
		s.BroadcastChannel <- virtualComment
	}
}

// =========================================================================
// 1. 实现 HandleUserPrompt (处理用户 Prompt)
// =========================================================================
func (s *server) HandleUserPrompt(ctx context.Context, in *pb.PromptRequest) (*pb.PromptResponse, error) {
	log.Printf("收到用户 Prompt: %s | 上下文: %s", in.GetPromptText(), in.GetContextScene())

	// 1. 准备 LLM 调用的参数和历史 (需要锁住状态)
	s.HostState.mu.Lock()
	hostPersonality := s.HostState.Personality
	contextScene := in.GetContextScene()
	callType := "文字留言"
	if strings.Contains(in.GetContextScene(), "Voice") { 
		callType = "听众来电"
	}
	history := s.HostState.ConversationHistory // 传递历史副本
	s.HostState.mu.Unlock()

	// 2. LLM 决策 (耗时操作，不在锁内执行)
	log.Println("--- 调用豆包 LLM API 进行决策 ---")
	llmResult, err := s.llmProxy.AnalyzeAndGenerate(ctx, in.GetPromptText(), contextScene, hostPersonality, callType, history)
	
	if err != nil {
		log.Printf("LLM 决策失败: %v", err)
		// LLM 失败，推送系统错误
		s.BroadcastChannel <- &pb.UpdateMessage{
			Type: pb.UpdateMessage_SYSTEM_STATUS,
			Payload: &pb.UpdateMessage_SystemStatusData{SystemStatusData: &pb.SystemStatusData{
				Severity: pb.SystemStatusData_SEVERITY_ERROR,
				Message: fmt.Sprintf("DJ Brain 宕机: %v", err),
			}},
		}
		return &pb.PromptResponse{Success: false, Message: "LLM 决策失败。"}, nil
	}
	
	log.Printf("LLM 决策成功! 流派: %s (原因: %s), 脚本: %s", 
		llmResult.MusicPrompts[0], llmResult.ActionReason, llmResult.DjScript)

	
	var primaryPrompt string
	if len(llmResult.MusicPrompts) > 0 {
		primaryPrompt = llmResult.MusicPrompts[0]
	} else {
		// 如果 LLM 没有返回 Prompt，使用默认值
		log.Println("警告: LLM 未返回 Music Prompts，使用默认流派。")
		primaryPrompt = initialCurrentGenre 
	}
	
	// 3. 更新服务器状态和历史 (再次锁住)
	s.HostState.mu.Lock()
	defer s.HostState.mu.Unlock()
	
	// A. 更新历史对话
	s.HostState.ConversationHistory = append(s.HostState.ConversationHistory, map[string]string{"role": "user", "content": in.GetPromptText()})
	s.HostState.ConversationHistory = append(s.HostState.ConversationHistory, map[string]string{"role": "assistant", "content": llmResult.DjScript})
	
	// B. 更新流派 (如果 LLM 决定切换)
	if llmResult.MusicPrompts[0] != "current_genre" {
		s.HostState.CurrentGenre = llmResult.MusicPrompts[0]
		// TODO: 实际调用 Magenta 代理
	}
	// 理论上，还要根据 llmResult.ConversationMemory 来清理或重写 history，但我们目前使用 append

	// 4. 推送实时更新 (DJ 脚本和流派切换)
	// A. 推送 DJ 脚本 (会作为字幕)
	s.BroadcastChannel <- &pb.UpdateMessage{
		Type: pb.UpdateMessage_HOST_SPEECH,
		TimestampMs: time.Now().UnixMilli(),
		Payload: &pb.UpdateMessage_HostSpeechData{HostSpeechData: &pb.HostSpeechData{
			ScriptText: llmResult.DjScript,
		}},
	}

	// B. 推送流派切换状态
	s.BroadcastChannel <- &pb.UpdateMessage{
		Type: pb.UpdateMessage_GENRE_CHANGE,
		TimestampMs: time.Now().UnixMilli(),
		Payload: &pb.UpdateMessage_GenreChangeData{GenreChangeData: &pb.GenreChangeData{
			NewGenreName: primaryPrompt,
			Reason: llmResult.ActionReason,
		}},
	}
	
	return &pb.PromptResponse{Success: true, Message: "LLM 决策完成并已推送实时更新。"}, nil
}

// =========================================================================
// 2. 实现 StreamUpdates (实时推送 - 核心)
// =========================================================================
func (s *server) StreamUpdates(in *pb.StreamRequest, stream pb.FlowRadioService_StreamUpdatesServer) error {
	clientID := in.GetClientSessionId()
	if clientID == "" {
		clientID = fmt.Sprintf("Client-%d", time.Now().UnixNano())
	}
	clientChan := make(chan *pb.UpdateMessage, 10) // 为每个客户端创建一个带缓冲的通道
	
	s.clientMux.Lock()
	s.clients[clientID] = clientChan
	s.clientMux.Unlock()
	
	log.Printf("新客户端连接以接收实时更新: %s", clientID)

	// 退出时清理资源
	defer func() {
		s.clientMux.Lock()
		delete(s.clients, clientID)
		close(clientChan)
		s.clientMux.Unlock()
		log.Printf("客户端 %s 已断开 StreamUpdates 连接。", clientID)
	}()

	// 持续从 clientChan 读取消息并发送给前端
	for update := range clientChan {
		if err := stream.Send(update); err != nil {
			return err // 发送失败，由 defer 清理连接
		}
	}
	return nil
}

// =========================================================================
// 3. 实现 SetMusicControl 和 SetHostConfig (基础控制)
// =========================================================================
func (s *server) SetMusicControl(ctx context.Context, in *pb.MusicControlRequest) (*pb.ControlResponse, error) {
	log.Printf("收到音乐控制指令: %v, 值: %d", in.GetCommand(), in.GetValue())
	
	// TODO: 根据指令 (PLAY/PAUSE/SET_VOLUME) 调用 Musicbeats 代理
	
	return &pb.ControlResponse{Success: true, Message: "控制指令已执行。"}, nil
}

func (s *server) SetHostConfig(ctx context.Context, in *pb.HostConfigRequest) (*pb.ConfigResponse, error) {
	log.Printf("收到主持人配置更新: %s, 性格: %s", in.GetHostId(), in.GetPersonalityType())
	
	s.HostState.mu.Lock()
	s.HostState.Personality = in.GetPersonalityType()
	s.HostState.mu.Unlock()
	
	// TODO: 通知 LLM 代理重新加载 System Prompt（或者在 NewServer 时就加载）
	
	return &pb.ConfigResponse{Success: true, Message: "主持人配置已更新。"}, nil
}

// =========================================================================
// 4. Go 主函数 (启动服务器)
// =========================================================================
func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("无法监听端口 %s: %v", port, err)
	}
	
	s := grpc.NewServer()
	// 注册服务，使用 NewServer 包装所有初始化
	pb.RegisterFlowRadioServiceServer(s, NewServer())
	
	log.Printf("FlowRadio Go Backend Server 正在监听 %v", lis.Addr())
	
	if err := s.Serve(lis); err != nil {
		log.Fatalf("gRPC Server 启动失败: %v", err)
	}
}