import requests
import json
# import sseclient

url = 'https://api.coze.cn/v1/workflow/stream_run'
headers = {
    "Authorization": "Bearer cztei_h54J7CE0br4glX44om8q4KqsCs8tRwck0errhBq9Dk9mZL2XwQHIEGJLvZNoLhaSU",
    "Content-Type": "application/json",
    "Accept": "text/event-stream"
}
data = {
  "workflow_id": "7581397947751333888",
  "parameters": {
    "CONVERSATION_NAME": "Default",
    "USER_INPUT": "晚上好，今天能和我聊聊经典音乐吗"
  }
}

print(f"Sending request to {url}...")
try:
    response = requests.post(url, headers=headers, json=data, stream=True)
    print(f"Response Status: {response.status_code}")
    
    for line in response.iter_lines():
        if line:
            decoded_line = line.decode('utf-8')
            print(f"RAW LINE: {decoded_line}")
            
except Exception as e:
    print(f"Error: {e}")
