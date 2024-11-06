import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { Helper } from '../utils/helper.js';
import { API } from './api/api.js';
import WebSocket from 'ws';
import a2_0x5ef004 from '../utils/logger.js';
export default class Core extends API {
  constructor(_0x5425a9, _0x3f954d) {
    super('https://ikknngrgxuxgjhplbpey.supabase.co', _0x3f954d);
    this.acc = _0x5425a9;
    this.socket = null;
    this.wssReconnectAttempts = 0x0;
    this.maxwssReconnectAttempts = 0x5;
    this.pingInterval = 0x0;
    this.point = {
      'pointsToday': 0x0,
      'pointsTotal': 0x0
    };
    this.pingCount = 0x0;
  }
  async ['login']() {
    await Helper.delay(0x3e8, this.acc, "Try to login...", this);
    const _0x4d25af = await this.fetch('/auth/v1/token?grant_type=password', 'POST', undefined, {
      'email': this.acc.email,
      'password': this.acc.password,
      'gotrue_meta_security': {}
    });
    if (_0x4d25af.status == 0xc8) {
      this.token = _0x4d25af.access_token;
      this.refreshToken = _0x4d25af.refresh_token;
      this.user = _0x4d25af.user;
    } else {
      this.handleError(_0x4d25af);
    }
  }
  async ["getUser"]() {
    await Helper.delay(0x3e8, this.acc, "Getting User Information...", this);
    const _0x361956 = await this.fetch('/auth/v1/user', 'GET', this.token);
    if (_0x361956.status == 0xc8) {
      this.user = _0x361956;
    } else {
      this.handleError(_0x361956);
    }
  }
  async connectWebSocket() {
    let _0x16f12c;
    if (this.proxy) {
        if (this.proxy.startsWith('http')) {
            _0x16f12c = new HttpsProxyAgent(this.proxy);
        }
        if (this.proxy.startsWith('socks')) {
            _0x16f12c = new SocksProxyAgent(this.proxy);
        }
    }
    this.socketURL = 'wss://secure.ws.teneo.pro/websocket?userId=' + this.user.id + '&version=v0.2';
    this.socket = new WebSocket(this.socketURL, {
        agent: _0x16f12c
    });

    this.socket.onopen = async () => {
        console.log("WebSocket connection opened.");
        this.wssReconnectAttempts = 0;
    };

    this.socket.onmessage = async (message) => {
        const data = JSON.parse(message.data);
        console.log("Received message:", data.message);
        this.startPing();
    };

    this.socket.onerror = async (error) => {
        console.error("WebSocket error:", error);
    };

    this.socket.onclose = async (event) => {
        if (event.wasClean) {
            console.log("WebSocket connection closed cleanly.");
        } else {
            console.log("WebSocket connection closed unexpectedly.");
        }
        this.stopPing();
        this.reconnectWebSocket();
    };
}
  async ['reconnectWebSocket']() {
    if (this.wssReconnectAttempts < this.maxwssReconnectAttempts) {
      this.wssReconnectAttempts += 0x1;
      const _0x2349b9 = Math.min(0x1388, 0x3e8 * this.wssReconnectAttempts);
      Helper.delay(_0x2349b9, this.acc, "Attempting to reconnect (#" + this.wssReconnectAttempts + ')...', this).then(() => this.connectWebSocket());
    } else {
      Helper.delay(0x3e8, this.acc, "Max reconnect attempts reached. Could not reconnect to WebSocket.", this);
    }
  }
  async ['sendPing']() {
    this.pingCount = this.pingCount + 0x1;
    await Helper.delay(0x0, this.acc, "Sending PING " + this.pingCount, this);
    this.socket.send(JSON.stringify({
      'type': 'PING'
    }));
    await Helper.delay(0x2710, this.acc, "PING " + this.pingCount + " Sended", this);
  }
  async ['startPing']() {
    if (!this.pingInterval) {
      await Helper.delay(0x0, this.acc, "Starting PING interval, Ping will be send every 10 Seconds", this);
      this.pingInterval = setInterval(async () => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          await this.sendPing();
        }
      }, 0x2710);
    }
  }
  async ['stopPing']() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
  async ['handleError'](_0x5c291f) {
    throw _0x5c291f;
  }
}