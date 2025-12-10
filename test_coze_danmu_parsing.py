import os
import json
import requests
import sseclient  # 需要安装: pip install sseclient-py
from dotenv import load_dotenv

# 加载环境变量
# 优先加载 bili-coze-panel 下的 .env
load_dotenv('bili-coze-panel/.env')
load_dotenv('.env') # 备用

COZE_API_TOKEN = os.getenv('COZE_API_TOKEN')
# 使用用户指定的 Workflow ID
WORKFLOW_ID = os.getenv('COZE_WORKFLOW_ID', '7581487516789735476') 
# APP_ID 可能不需要，或者使用默认值
APP_ID = os.getenv('MAIN_APP_ID', '')

if not COZE_API_TOKEN:
    print("❌ 错误: 未找到 COZE_API_TOKEN")
    exit(1)

url = "https://api.coze.cn/v1/workflow/stream_run"

# 模拟用户弹幕输入
# 用户提供的测试文本
test_text = "用户 TestUser_Danmu 进入了直播间，请热情欢迎一下！"
user_name = "弹幕分析师"

payload = {
    "workflow_id": WORKFLOW_ID,
    "parameters": {
        "USER_INPUT": "用户 TestUser_Danmu 进入了直播间，请热情欢迎一下！",
        "CONVERSATION_NAME": "Default",
        "User_name": "弹幕分析师",
        "Chat_trigger": True,
        "text_input": "用户 TestUser_Danmu 进入了直播间，请热情欢迎一下！",
        "process_input": "",
        "danmu": [
            {
                "name": "TestUser_Danmu",
                "weight": 1,
                "text": "进入直播间"
            }
        ]
    }
}

# if APP_ID:
#     payload["app_id"] = APP_ID

headers = {
    "Authorization": f"Bearer {COZE_API_TOKEN}",
    "Content-Type": "application/json"
}

print(f"🚀 发起 Coze 请求...")
print(f"📝 输入: {test_text}")
print(f"👤 用户: {user_name}")
print(f"📦 Payload: {json.dumps(payload, indent=2, ensure_ascii=False)}")
print("-" * 50)

try:
    response = requests.post(url, json=payload, headers=headers, stream=True)
    response.raise_for_status()

    client = sseclient.SSEClient(response)
    
    print("📡 接收流式响应中...\n")

    for event in client.events():
        if event.event == "Message":
            try:
                data = json.loads(event.data)
                node_title = data.get("node_title", "Unknown")
                content = data.get("content", "")
                
                print(f"📦 [节点: {node_title}]")
                print(f"📄 内容 (Raw): {content}")
                
                # 尝试解析内容中的 JSON
                try:
                    # 有些内容是 "文本\n{JSON}" 格式
                    if "\n{" in content:
                        parts = content.split("\n{")
                        text_part = parts[0]
                        json_part = "{" + parts[1]
                        print(f"   ---> 文本部分: {text_part}")
                        parsed_json = json.loads(json_part)
                        print(f"   ---> JSON部分: {json.dumps(parsed_json, indent=2, ensure_ascii=False)}")
                    elif content.strip().startswith("{") or content.strip().startswith("["):
                        parsed_json = json.loads(content)
                        print(f"   ---> 纯JSON解析: {json.dumps(parsed_json, indent=2, ensure_ascii=False)}")
                    else:
                        print(f"   ---> 纯文本: {content}")
                except json.JSONDecodeError:
                    print("   ---> (无法解析为 JSON)")
                
                print("-" * 30)
                
            except json.JSONDecodeError:
                print(f"⚠️ 无法解析 Event Data: {event.data}")
        elif event.event == "Done":
            print("✅ 流程结束")
        elif event.event == "Error":
            print(f"❌ 错误: {event.data}")

except Exception as e:
    print(f"❌ 请求发生异常: {e}")
