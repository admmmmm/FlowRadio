package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"
)

// MagentaProxy 封装对远程 Python API (Magenta RT) 的调用
type MagentaProxy struct {
	serverURL string 
	client    *http.Client
}

// NewMagentaProxy 初始化代理
// serverIP: 远程服务器的 Tailscale IP
func NewMagentaProxy(serverIP string) *MagentaProxy {
	return &MagentaProxy{
		serverURL: fmt.Sprintf("http://%s:8000", serverIP),
		client:    &http.Client{Timeout: 10 * time.Second}, // 控制指令超时设置
	}
}

// SetStyle 发送风格切换指令 (POST /style)
// 对应 server.py 中的 @app.post("/style")
func (p *MagentaProxy) SetStyle(prompt string) error {
	// 构建 JSON 请求体
	jsonData := map[string]string{"prompt": prompt}
	jsonBytes, err := json.Marshal(jsonData)
	if err != nil {
		return fmt.Errorf("JSON 序列化失败: %v", err)
	}
	
	url := fmt.Sprintf("%s/style", p.serverURL)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonBytes))
	if err != nil {
		return fmt.Errorf("创建请求失败: %v", err)
	}
	
	req.Header.Set("Content-Type", "application/json")

	resp, err := p.client.Do(req)
	if err != nil {
		return fmt.Errorf("发送风格请求失败: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return fmt.Errorf("服务器返回错误状态码: %d", resp.StatusCode)
	}
	
	log.Printf("[MagentaProxy] 风格已成功切换为: %s", prompt)
	return nil
}

// SetStyleWithParams 使用完整的音乐参数设置风格
func (p *MagentaProxy) SetStyleWithParams(params map[string]interface{}) (map[string]interface{}, error) {
	// 直接将参数对象发送给 Lyria Python 服务
	jsonBytes, err := json.Marshal(params)
	if err != nil {
		return nil, fmt.Errorf("JSON 序列化失败: %v", err)
	}
	
	log.Printf("[MagentaProxy] 📤 发送到 Lyria: %s", string(jsonBytes))
	
	url := fmt.Sprintf("%s/style", p.serverURL)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonBytes))
	if err != nil {
		return nil, fmt.Errorf("创建请求失败: %v", err)
	}
	
	req.Header.Set("Content-Type", "application/json")

	resp, err := p.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("发送风格请求失败: %v", err)
	}
	defer resp.Body.Close()

	// 读取响应体
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("读取响应失败: %v", err)
	}

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("服务器返回错误状态码: %d, 响应: %s", resp.StatusCode, string(body))
	}
	
	// 解析 JSON 响应
	var result map[string]interface{}
	if err := json.Unmarshal(body, &result); err != nil {
		log.Printf("[MagentaProxy] ⚠️ 响应不是 JSON: %s", string(body))
		result = map[string]interface{}{
			"status": "ok",
			"message": string(body),
		}
	}
	
	log.Printf("[MagentaProxy] ✅ Lyria 响应: %v", result)
	return result, nil
}

// GetAudioStream 连接音频流 (GET /stream)
// 对应 server.py 中的 @app.get("/stream")
// 返回一个 ReadCloser，调用者可以从中持续读取音频数据
func (p *MagentaProxy) GetAudioStream(ctx context.Context) (io.ReadCloser, error) {
	url := fmt.Sprintf("%s/stream", p.serverURL)
	
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return nil, err
	}

	// 注意：这里必须使用不带超时的 client，因为这是长连接流
	streamClient := &http.Client{Timeout: 0} 
	
	resp, err := streamClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("连接音频流失败: %v", err)
	}

	if resp.StatusCode != 200 {
		resp.Body.Close()
		return nil, fmt.Errorf("音频流连接错误: %d", resp.StatusCode)
	}

	log.Println("[MagentaProxy] 已连接到远程 Magenta 音频流")
	return resp.Body, nil
}