import requests
import json
import os

# Configuration
WORKFLOW_ID = "7581487516789735476"
API_TOKEN = os.environ.get("COZE_API_TOKEN", "pat_Wa6zkuduQfdqSxHsSOuT2i1gDuvliVTOTHUYPwflStO9ycxGdvXFp7N4PCLjoM9L")

url = "https://api.coze.cn/v1/workflow/stream_run"

# The failing payload from Go logs
payload = {
  "workflow_id": "7581397947751333888",
  "parameters": {
    "CONVERSATION_NAME": "Default",
    "Chat_trigger": False,
    "USER_INPUT": "主播，周五就要下雪了",
    "User_name": "大樹",
    "danmu": [
      {
        "name": "大樹",
        "text": "主播，周五就要下雪了",
        "weight": 1
      }
    ],
    "process_input": "用户在线听歌。Host1负责对音乐做出评论，Host2负责回复弹幕。",
    "text_input": "主播，周五就要下雪了"
  }
}

headers = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json",
    "Accept": "text/event-stream"
}

print(f"🚀 Launching Coze Workflow Request...")
print(f"Payload: {json.dumps(payload, indent=2, ensure_ascii=False)}")

try:
    response = requests.post(url, headers=headers, json=payload, stream=True)
    response.raise_for_status()

    print("📡 Receiving Stream Response...")
    
    for line in response.iter_lines():
        if line:
            decoded_line = line.decode('utf-8')
            print(f"RAW: {decoded_line}")
            if decoded_line.startswith("data:"):
                data_str = decoded_line[5:].strip()
                try:
                    data = json.loads(data_str)
                    node_title = data.get("node_title", "Unknown")
                    print(f"📦 Node: {node_title}")
                except:
                    pass
                    
except Exception as e:
    print(f"❌ Error: {e}")
