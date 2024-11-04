import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { Helper } from '../utils/helper.js';
import { API } from './api/api.js';
import a2_0x5ef004 from '../utils/logger.js';
import WebSocket from 'ws';

export default class Core extends API {
  constructor(_0x5425a9, _0x3f954d) {
    super('https://ikknngrgxuxgjhplbpey.supabase.co', _0x3f954d);
    this.acc = _0x5425a9;
    this.socket = null;
    this.wssReconnectAttempts = 0;
    this.maxwssReconnectAttempts = 5;
    this.pingInterval = 0;
    this.point = { pointsToday: 0, pointsTotal: 0 };
    this.pingCount = 0;
  }

  async login() {
    await Helper.delay(1000, this.acc, "Trying to log in...", this);
    const response = await this.fetch('/auth/v1/token?grant_type=password', 'POST', undefined, {
      email: this.acc.email,
      password: this.acc.password,
      gotrue_meta_security: {}
    });

    if (response.status === 200) {
      this.token = response.access_token;
      this.refreshToken = response.refresh_token;
      this.user = response.user;
    } else {
      this.handleError(response);
    }
  }

  async getUser() {
    await Helper.delay(1000, this.acc, "Getting User Information...", this);
    const response = await this.fetch('/auth/v1/user', 'GET', this.token);

    if (response.status === 200) {
      this.user = response;
    } else {
      this.handleError(response);
    }
  }

  async connectWebSocket() {
    let proxyAgent;

    if (this.proxy) {
      if (this.proxy.startsWith('http')) {
        proxyAgent = new HttpsProxyAgent(this.proxy);
      } else if (this.proxy.startsWith('socks')) {
        proxyAgent = new SocksProxyAgent(this.proxy);
      }
    }

    this.socketURL = `wss://secure.ws.teneo.pro/websocket?userId=${this.user.id}&version=v0.2`;
    this.socket = new WebSocket(this.socketURL, { agent: proxyAgent });

    this.socket.onopen = async () => {
      await Helper.delay(500, this.acc, "WebSocket connection opened.", this);
      this.wssReconnectAttempts = 0;
      this.startPing();
    };

    this.socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      a2_0x5ef004.info(event.data);

      await Helper.delay(2000, this.acc, "Received message: " + data.message, this);

      if (data.pointsToday) {
        this.point = { pointsToday: data.pointsToday, pointsTotal: data.pointsTotal };
        await Helper.delay(1000, this.acc, "User Points Updated", this);
      }
    };

    this.socket.onerror = async (error) => {
      await Helper.delay(500, this.acc, "WebSocket error: " + error, this);
    };

    this.socket.onclose = async (event) => {
      await Helper.delay(500, this.acc, `WebSocket connection closed${event.wasClean ? ' cleanly' : ' unexpectedly'}.`, this);
      await this.stopPing();
      await this.reconnectWebSocket();
    };
  }

  async reconnectWebSocket() {
    if (this.wssReconnectAttempts < this.maxwssReconnectAttempts) {
      this.wssReconnectAttempts += 1;
      const reconnectDelay = Math.min(5000, 1000 * this.wssReconnectAttempts);
      await Helper.delay(reconnectDelay, this.acc, `Attempting to reconnect (#${this.wssReconnectAttempts})...`, this);
      await this.connectWebSocket();
    } else {
      await Helper.delay(1000, this.acc, "Max reconnect attempts reached. Could not reconnect to WebSocket.", this);
    }
  }

  async sendPing() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.pingCount += 1;
      await Helper.delay(0, this.acc, `Sending PING ${this.pingCount}`, this);
      this.socket.send(JSON.stringify({ type: 'PING' }));
    }
  }

  startPing() {
    if (!this.pingInterval) {
      a2_0x5ef004.info("Starting PING interval; Ping will be sent every 10 seconds");
      this.pingInterval = setInterval(() => this.sendPing(), 10000); // Set to 10 seconds
    }
  }

  stopPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
      a2_0x5ef004.info("Ping interval stopped");
    }
  }

  handleError(error) {
    throw error;
  }
}
