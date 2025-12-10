import requests
import json
import os

# Configuration
BOT_ID = "7581771809125859355"
API_TOKEN = os.environ.get("COZE_API_TOKEN", "pat_Wa6zkuduQfdqSxHsSOuT2i1gDuvliVTOTHUYPwflStO9ycxGdvXFp7N4PCLjoM9L")

url = "https://api.coze.cn/v3/chat"

payload = {
    "bot_id": BOT_ID,
    "user_id": "test_user",
    "stream": True,
    "auto_save_history": True,
    "additional_messages": [
        {
            "role": "user",
            "content": "主播，周五就要下雪了",
            "content_type": "text"
        }
    ]
}

headers = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}

print(f"🚀 Launching Coze Bot Request...")
print(f"Bot ID: {BOT_ID}")

try:
    response = requests.post(url, headers=headers, json=payload, stream=True)
    
    if response.status_code != 200:
        print(f"❌ Error: {response.status_code} - {response.text}")
    else:
        print("📡 Receiving Stream Response...")
        for line in response.iter_lines():
            if line:
                decoded_line = line.decode('utf-8')
                print(f"RAW: {decoded_line}")
except Exception as e:
    print(f"❌ Error: {e}")
