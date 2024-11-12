  import { HttpsProxyAgent } from 'https-proxy-agent';
  import { SocksProxyAgent } from 'socks-proxy-agent';
  import { Helper } from '../utils/helper.js';
  import { API } from './api/api.js';
  import a2_0xf4b995 from '../utils/logger.js';
  import a2_0x1349ed from 'ws';
  export default class Core extends API {
    constructor(_0x5415a0, _0x396bac) {
      super('https://ikknngrgxuxgjhplbpey.supabase.co', _0x396bac);
      this.acc = _0x5415a0;
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
      const _0x3675bd = await this.fetch("/auth/v1/token?grant_type=password", 'POST', undefined, {
        'email': this.acc.email,
        'password': this.acc.password,
        'gotrue_meta_security': {}
      });
      if (_0x3675bd.status == 0xc8) {
        this.token = _0x3675bd.access_token;
        this.refreshToken = _0x3675bd.refresh_token;
        this.user = _0x3675bd.user;
      } else {
        this.handleError(_0x3675bd);
      }
    }
    async ['getUser']() {
      await Helper.delay(0x3e8, this.acc, "Getting User Information...", this);
      const _0x2b8a93 = await this.fetch('/auth/v1/user', 'GET', this.token);
      if (_0x2b8a93.status == 0xc8) {
        this.user = _0x2b8a93;
      } else {
        this.handleError(_0x2b8a93);
      }
    }
    async ['connectWebSocket']() {
      let _0x39fe90;
      try {
        await Helper.delay(0x1f4, this.acc, "Connecting to websocket.", this);
        if (this.proxy) {
          if (this.proxy.startsWith('http')) {
            _0x39fe90 = new HttpsProxyAgent(this.proxy);
          }
          if (this.proxy.startsWith('socks')) {
            _0x39fe90 = new SocksProxyAgent(this.proxy);
          }
        }
        this.socketURL = 'wss://secure.ws.teneo.pro/websocket?userId=' + this.user.id + '&version=v0.2';
        this.socket = new a2_0x1349ed(this.socketURL, {
          'agent': _0x39fe90
        });
        this.socket.onopen = async () => {
          try {
            await Helper.delay(0x1f4, this.acc, "WebSocket connection opened.", this);
            this.wssReconnectAttempts = 0x0;
          } catch (_0xefca01) {
            a2_0xf4b995.error("Error during WebSocket onopen: " + _0xefca01);
            throw _0xefca01;
          }
        };
        this.socket.onmessage = async _0x273b1d => {
          try {
            const _0x184a94 = JSON.parse(_0x273b1d.data);
            a2_0xf4b995.info(_0x273b1d.data);
            await Helper.delay(0x7d0, this.acc, "Received message: " + _0x184a94.message, this);
            if (_0x184a94.pointsToday) {
              this.point = {
                'pointsToday': _0x184a94.pointsToday,
                'pointsTotal': _0x184a94.pointsTotal
              };
              await Helper.delay(0x3e8, this.acc, "User Point Updated", this);
            }
            this.startPing();
          } catch (_0x40b994) {
            a2_0xf4b995.error("Error processing WebSocket message: " + _0x40b994);
            throw _0x40b994;
          }
        };
        this.socket.onerror = async _0x2a8d8d => {
          try {
            await Helper.delay(0x1f4, this.acc, "WebSocket error: " + _0x2a8d8d, this);
          } catch (_0x2fc034) {
            a2_0xf4b995.error("Error during WebSocket onerror handling: " + _0x2fc034);
            throw _0x2fc034;
          }
        };
        this.socket.onclose = async _0x9f4e02 => {
          try {
            if (_0x9f4e02.wasClean) {
              await Helper.delay(0x1f4, this.acc, "WebSocket connection closed cleanly.", this);
            } else {
              await Helper.delay(0x1f4, this.acc, "WebSocket connection closed unexpectedly.", this);
            }
            await this.stopPing();
            await this.reconnectWebSocket();
          } catch (_0x16468f) {
            a2_0xf4b995.error("Error during WebSocket onclose handling: " + _0x16468f);
            throw _0x16468f;
          }
        };
      } catch (_0x379f52) {
        a2_0xf4b995.error("Error in connectWebSocket: " + _0x379f52);
        throw _0x379f52;
      }
    }
    async ["reconnectWebSocket"]() {
      try {
        if (this.wssReconnectAttempts < this.maxwssReconnectAttempts) {
          this.wssReconnectAttempts += 0x1;
          const _0x4bc4e7 = Math.min(0x1388, 0x3e8 * this.wssReconnectAttempts);
          await Helper.delay(_0x4bc4e7, this.acc, "Attempting to reconnect (#" + this.wssReconnectAttempts + ')...', this);
          await this.connectWebSocket();
        } else {
          await Helper.delay(1800000, this.acc, "Max reconnect attempts reached. Could not reconnect to WebSocket. Retrying after 30 min", this);
          await this.connectWebSocket();
        }
      } catch (_0x1897d9) {
        a2_0xf4b995.error("Error in reconnectWebSocket: " + _0x1897d9);
        throw _0x1897d9;
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
          if (this.socket && this.socket.readyState === a2_0x1349ed.OPEN) {
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
    async ['handleError'](_0x4a93ee) {
      throw _0x4a93ee;
    }
  }