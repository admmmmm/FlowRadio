#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
B 站直播间实时抓取终极版 
(含电池计算 + 大航海适配 + 权重系统 + 自动修复昵称 + 身份登录防降级)
"""

import ssl
import sys
import json
import struct
import threading
import time
import zlib
import requests
import websocket
from loguru import logger

# ---------- 全局变量 ----------
ROOM_ID = 0
TOKEN = ""
WS_URL = ""
MY_UID = 0 # 登录用户的 UID
SESSDATA = "" # 登录凭证

# 用户权重字典 {uid: score}
USER_WEIGHTS = {}
# 用户名缓存 {uid: "真实名字"}
NAME_CACHE = {}
# -----------------------------

def get_my_uid(sessdata: str):
    """
    通过 SESSDATA 获取登录用户的 UID
    """
    if not sessdata:
        return 0
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Cookie": f"SESSDATA={sessdata}"
    }
    try:
        # 请求导航接口获取用户信息
        url = "https://api.bilibili.com/x/web-interface/nav"
        r = requests.get(url, headers=headers, timeout=5)
        r.raise_for_status()
        data = r.json()
        if data["code"] == 0 and data["data"]["isLogin"]:
            uid = data["data"]["mid"]
            name = data["data"]["uname"]
            logger.success(f"登录成功: {name} (UID: {uid})")
            return uid
    except Exception as e:
        logger.warning(f"Cookie 验证失败，将以游客身份连接: {e}")
    return 0

def get_room_info(short_id: int):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": f"https://live.bilibili.com/{short_id}"
    }
    
    # 如果有 SESSDATA，加入 Header
    if SESSDATA:
        headers["Cookie"] = f"SESSDATA={SESSDATA}"

    # 1. 获取真实房间号
    try:
        url_info = "https://api.live.bilibili.com/room/v1/Room/get_info"
        r = requests.get(url_info, params={"id": short_id}, headers=headers, timeout=5)
        r.raise_for_status()
        room_info = r.json()
        if room_info["code"] != 0:
            raise RuntimeError(f"房间查询失败: {room_info.get('message', '未知错误')}")
        real_room_id = room_info["data"]["room_id"]
        owner_name = room_info["data"].get("anchor_info", {}).get("base_info", {}).get("uname", "未知主播")
        logger.info(f"目标直播间: {owner_name} (真实房号: {real_room_id})")
    except Exception as e:
        raise RuntimeError(f"获取真实房号失败: {e}")
    
    # 2. 获取连接配置
    try:
        url_conf = "https://api.live.bilibili.com/room/v1/Danmu/getConf"
        params = {"room_id": real_room_id, "platform": "pc", "player": "web"}
        r = requests.get(url_conf, params=params, headers=headers, timeout=5)
        r.raise_for_status()
        conf_info = r.json()
        if conf_info["code"] != 0:
            raise RuntimeError(f"获取弹幕配置失败: {conf_info.get('message')}")
        data = conf_info["data"]
        token = data["token"]
        server_list = data["host_server_list"]
        host = server_list[0]["host"]
        port = server_list[0]["wss_port"]
        wss_url = f"wss://{host}:{port}/sub"
        return real_room_id, token, wss_url
    except Exception as e:
        raise RuntimeError(f"获取连接令牌失败: {e}")

# ---------- 协议处理 ----------
def pack_msg(op: int, body: str | bytes) -> bytes:
    if isinstance(body, str):
        body = body.encode("utf-8")
    packet_len = 16 + len(body)
    header = struct.pack(">IHHII", packet_len, 16, 1, op, 1)
    return header + body

def parse_packet(resp: bytes):
    msgs = []
    ptr = 0
    while ptr < len(resp):
        try:
            pack_len, head_len, ver, op, _ = struct.unpack(">IHHII", resp[ptr:ptr + 16])
        except struct.error:
            break
        if pack_len > len(resp) - ptr:
            break
        body = resp[ptr + head_len:ptr + pack_len]
        if op == 5:
            if ver == 0:
                try:
                    msgs.append(json.loads(body.decode("utf-8")))
                except:
                    pass
            elif ver == 2:
                try:
                    decompressed = zlib.decompress(body)
                    msgs.extend(parse_packet(decompressed))
                except:
                    pass
        elif op == 3:
            pass
        ptr += pack_len
    return msgs

# ---------- 核心逻辑 ----------
def update_weight(uid: int, add_score: int = 0) -> int:
    """更新权重，忽略匿名用户"""
    if uid == 0: return 1
    if uid not in USER_WEIGHTS: USER_WEIGHTS[uid] = 1
    USER_WEIGHTS[uid] += add_score
    return USER_WEIGHTS[uid]

def get_real_name(uid: int, current_name: str) -> str:
    """修复打码名字，登录状态下通常不需要这个，因为B站会直接给真名"""
    if uid == 0: return current_name
    if uid in NAME_CACHE: return NAME_CACHE[uid]
    if "***" not in current_name:
        NAME_CACHE[uid] = current_name
        return current_name
    # 仍尝试 API 修复，以防万一
    try:
        headers = {"User-Agent": "Mozilla/5.0"} 
        # API 也可以带 Cookie，防风控
        if SESSDATA: headers["Cookie"] = f"SESSDATA={SESSDATA}"
        
        r = requests.get("https://api.bilibili.com/x/web-interface/card", params={"mid": uid}, headers=headers, timeout=3)
        if r.status_code == 200 and r.json()["code"] == 0:
            real_name = r.json()["data"]["card"]["name"]
            NAME_CACHE[uid] = real_name
            return real_name
    except:
        pass
    return current_name

def handle_message(data):
    cmd = data.get("cmd", "")
    special_fleet_gifts = {"干杯之旅", "启航之旅", "友谊的小船", "冲浪", "海湾之旅", "鸿运小电视"}

    # 1. 弹幕
    if "DANMU_MSG" in cmd:
        info = data["info"]
        uid = info[2][0]
        raw_name = info[2][1]
        text = info[1]
        
        uid_str = f"UID:{uid}" if uid != 0 else "匿名"
        name = get_real_name(uid, raw_name)
        w = update_weight(uid, 0)
        
        logger.info(f"[弹幕] {name}: {text} [权重{w}] [{uid_str}]")
        return

    # 2. 礼物
    if cmd == "SEND_GIFT":
        d = data["data"]
        uid = d.get("uid", 0)
        raw_name = d["uname"]
        gift_name = d["giftName"]
        num = d["num"]
        total_coin = d.get("total_coin", 0)
        
        uid_str = f"UID:{uid}" if uid != 0 else "匿名"
        name = get_real_name(uid, raw_name)
        battery = total_coin // 100
        w = update_weight(uid, battery)
        
        if gift_name in special_fleet_gifts:
            logger.warning(f"★★ [大航海] 恭喜 {name} 购买了 {num} 个 {gift_name}！(价值 {battery} 电池) [权重{w}] [{uid_str}] ★★")
        elif d["coin_type"] == "gold":
            logger.success(f"[礼物] {name} 投喂 {num} 个 {gift_name} (共 {battery} 电池) [权重{w}] [{uid_str}]")
        else:
            w = update_weight(uid, 0)
            logger.info(f"[礼物] {name} 投喂 {num} 个 {gift_name} (免费礼物) [权重{w}] [{uid_str}]")
        return

    # 3. 大航海
    if cmd == "GUARD_BUY":
        d = data["data"]
        uid = d.get("uid", 0)
        raw_name = d["username"]
        raw_gift_name = d["gift_name"]
        num = d["num"]
        price = d["price"]
        
        uid_str = f"UID:{uid}" if uid != 0 else "匿名"
        name = get_real_name(uid, raw_name)
        battery = price // 100
        w = update_weight(uid, battery)
        
        name_map = {"舰长": "舰长一号", "提督": "提督一号", "总督": "总督一号"}
        final_name = name_map.get(raw_gift_name, raw_gift_name)
        logger.warning(f"★★ [大航海] 恭喜 {name} 购买了 {num} 个 {final_name}！(价值 {battery} 电池) [权重{w}] [{uid_str}] ★★")
        return

    # 4. 互动
    if cmd == "INTERACT_WORD":
        d = data["data"]
        uid = d.get("uid", 0)
        raw_name = d["uname"]
        msg_type = d["msg_type"]
        
        uid_str = f"UID:{uid}" if uid != 0 else "匿名"
        name = get_real_name(uid, raw_name)
        w = update_weight(uid, 0)
        
        action = {1: "进入直播间", 2: "关注了主播", 3: "分享了直播间"}.get(msg_type, "未知操作")
        logger.info(f"[互动] {name} {action} [权重{w}] [{uid_str}]")
        return

    # 5. 点赞
    if cmd == "LIKE_INFO_V3_CLICK":
        d = data["data"]
        uid = d.get("uid", 0)
        raw_name = d["uname"]
        
        uid_str = f"UID:{uid}" if uid != 0 else "匿名"
        name = get_real_name(uid, raw_name)
        w = update_weight(uid, 0)
        logger.info(f"[点赞] {name} 为主播点赞了 [权重{w}] [{uid_str}]")
        return

    if cmd == "ENTRY_EFFECT":
        d = data["data"]
        uid = d.get("uid", 0)
        clean_text = d.get("copy_writing", "").replace("<%", "").replace("%>", "")
        w = update_weight(uid, 0)
        logger.info(f"[进场] {clean_text} [权重{w}] [UID:{uid}]")
        return

# ---------- WebSocket 回调 ----------
def on_open(ws: websocket.WebSocketApp):
    def run():
        # 鉴权包：如果有登录，必须传真实的 MY_UID，否则B站服务器会认为信息不匹配
        auth_data = {
            "uid": MY_UID, # 这里传入真实 UID (如果是游客则是0)
            "roomid": ROOM_ID,
            "protover": 2,
            "platform": "web",
            "type": 2,
            "key": TOKEN
        }
        ws.send(pack_msg(7, json.dumps(auth_data)), opcode=websocket.ABNF.OPCODE_BINARY)
        logger.info("连接成功，鉴权请求已发送...")
        
        while ws.keep_running:
            time.sleep(30)
            try:
                ws.send(pack_msg(2, ""), opcode=websocket.ABNF.OPCODE_BINARY)
            except:
                break
    threading.Thread(target=run, daemon=True).start()

def on_message(_ws, msg: bytes):
    try:
        for data in parse_packet(msg):
            if isinstance(data, dict):
                handle_message(data)
    except Exception:
        pass

def on_error(_ws, error):
    logger.error(f"WS 错误: {error}")
def on_close(_ws, _code, _reason):
    logger.warning("WS 连接断开")

# ---------- 主入口 ----------
if __name__ == "__main__":
    logger.remove()
    logger.add(sys.stdout, format="<green>{time:HH:mm:ss}</green> | {message}")
    
    try:
        # 1. 询问 SESSDATA (为了解决匿名问题，强烈建议输入)
        print("-" * 50)
        print("提示: 为了防止B站开启隐私模式导致UID变成0和名字打码，")
        print("强烈建议输入你的 SESSDATA (在浏览器F12->Application->Cookies中查找)")
        print("如果不输入，十几秒后可能会进入匿名模式。")
        print("获取你的 SESSDATA 的步骤：")
        print("1.在浏览器（Chrome/Edge）打开 B 站并登录。")
        print("2.根据电脑配置，按 Ctrl/Fn + F12 打开开发者工具，点击顶部的 Application（应用程序）标签。")
        print("3.在左侧栏找到 Cookies -> https://www.bilibili.com。")
        print("4.在右侧列表中找到名为 SESSDATA 的一行，将其点开，但不要把 Show URL-Decoded 点选成打勾状态。")
        print("5.然后你会拿到一大串乱码，全部选中复制粘贴即可。")
        print("⚠️ 注意：请妥善保管你的 SESSDATA，避免泄露给他人！")
        print("⚠️ 在希望使用你旧有的 SESSDATA 时，不要修改密码或者手动退出登录，否则SESSDATA会改变，你将需要重新获取；\\n另外，SESSDATA每半年或者一年可能会自动更改，你也要重新获取。")
        print("⚠️ 如果用于功能展示，最好展示前按以上步骤重新获取有效的 SESSDATA。")
        print("-" * 50)
        sess_input = input("请输入 SESSDATA (直接回车跳过): ").strip()
        SESSDATA = sess_input
        
        # 验证 SESSDATA
        if SESSDATA:
            logger.info("正在验证 Cookie...")
            MY_UID = get_my_uid(SESSDATA)
        
        # 2. 询问房间号
        input_id = input("你需要在哪个房间号抓取信息？")
        if not input_id.strip():
            logger.error("房间号不能为空！")
            sys.exit(1)
        try:
            SHORT_ID = int(input_id)
        except ValueError:
            logger.error("请输入有效的数字房间号！")
            sys.exit(1)

        logger.info(f"正在获取直播间 {SHORT_ID} 信息...")
        ROOM_ID, TOKEN, WS_URL = get_room_info(SHORT_ID)
        
        ws_app = websocket.WebSocketApp(
            WS_URL, on_open=on_open, on_message=on_message,
            on_error=on_error, on_close=on_close,
            header=["User-Agent: Mozilla/5.0"]
        )
        ws_app.run_forever(sslopt={"cert_reqs": ssl.CERT_NONE})
        
    except KeyboardInterrupt:
        pass
    except Exception as e:
        logger.exception(e)
