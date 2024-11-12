  import { HttpsProxyAgent } from 'https-proxy-agent';
  import a1_0x320d33 from 'node-fetch';
  import { Helper } from '../../utils/helper.js';
  import a1_0x35e38c from '../../utils/logger.js';
  import { SocksProxyAgent } from 'socks-proxy-agent';
  export class API {
    constructor(_0x51637c, _0x5dcd8a) {
      this.url = _0x51637c;
      this.proxy = _0x5dcd8a;
      this.ua = Helper.randomUserAgent();
      this.subspaceApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlra25uZ3JneHV4Z2pocGxicGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0MzgxNTAsImV4cCI6MjA0MTAxNDE1MH0.DRAvf8nH1ojnJBc3rD_Nw6t1AV8X_g6gmY_HByG2Mag';
    }
    ['generateHeaders'](_0x3d6553 = undefined) {
      const _0x25bef5 = {
        'Accept': "application/json, text/plain, */*",
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
        'Content-Type': 'application/json',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Site': 'same-site',
        'Sec-Fetch-Mode': 'cors',
        'User-Agent': this.ua,
        'Apikey': this.subspaceApiKey
      };
      if (_0x3d6553) {
        _0x25bef5.Authorization = "Bearer " + (_0x3d6553.includes("Bearer ") ? _0x3d6553.replace("Bearer ", '') : _0x3d6553);
      } else {
        _0x25bef5.Authorization = "Bearer " + this.subspaceApiKey;
      }
      return _0x25bef5;
    }
    ['replaceSensitiveData'](_0x2f47e4) {
      if (this.something) {
        if (typeof this.something === 'string') {
          const _0x3ae831 = new RegExp(this.something, 'g');
          return _0x2f47e4.replace(_0x3ae831, '?????');
        } else if (Array.isArray(this.something)) {
          this.something.forEach(_0x419150 => {
            const _0x1c5ad2 = new RegExp(_0x419150, 'g');
            _0x2f47e4 = _0x2f47e4.replace(_0x1c5ad2, '?????');
          });
        }
      }
      return _0x2f47e4;
    }
    async ['fetch'](_0x416575, _0x2e6195, _0x313587, _0x2c238a = {}, _0x4dc3e6 = {}, _0x4633cb = false) {
      const _0x3b5c58 = _0x4633cb ? _0x416575 : '' + this.url + _0x416575;
      try {
        const _0x464ef7 = {
          ...this.generateHeaders(_0x313587),
          ..._0x4dc3e6
        };
        const _0x363ba6 = {
          'headers': _0x464ef7,
          'method': _0x2e6195,
          'referer': this.origin + '/'
        };
        a1_0x35e38c.info(_0x2e6195 + " : " + this.replaceSensitiveData(_0x3b5c58) + " " + (this.proxy ? this.proxy : ''));
        for (let _0xf036a2 in _0x464ef7) {
          _0x464ef7[_0xf036a2] = this.replaceSensitiveData(_0x464ef7[_0xf036a2]);
        }
        a1_0x35e38c.info("Request Header : " + JSON.stringify(_0x464ef7));
        if (_0x2e6195 !== "GET") {
          _0x363ba6.body = '' + JSON.stringify(_0x2c238a);
          const _0x5672ca = this.replaceSensitiveData(_0x363ba6.body);
          a1_0x35e38c.info("Request Body : " + _0x5672ca);
        }
        if (this.proxy) {
          if (this.proxy.startsWith('http')) {
            _0x363ba6.agent = new HttpsProxyAgent(this.proxy, {
              'rejectUnauthorized': false
            });
          }
          if (this.proxy.startsWith('socks')) {
            _0x363ba6.agent = new SocksProxyAgent(this.proxy, {
              'rejectUnauthorized': false
            });
          }
        }
        const _0xf91471 = await a1_0x320d33(_0x3b5c58, _0x363ba6);
        a1_0x35e38c.info("Response : " + _0xf91471.status + " " + _0xf91471.statusText);
        if (_0xf91471.ok || _0xf91471.status == 0x190 || _0xf91471.status == 0x193) {
          const _0x317e35 = _0xf91471.headers.get('content-type');
          let _0x59ea50;
          if (_0x317e35 && _0x317e35.includes('application/json')) {
            _0x59ea50 = await _0xf91471.json();
            _0x59ea50.status = _0xf91471.status;
          } else {
            _0x59ea50 = {
              'status': _0xf91471.status,
              'message': await _0xf91471.text()
            };
          }
          if (_0xf91471.ok) {
            _0x59ea50.status = 0xc8;
          }
          let _0x56905c = JSON.stringify(_0x59ea50);
          _0x56905c = this.replaceSensitiveData(_0x56905c);
          if (_0x56905c.length > 0xc8) {
            _0x56905c = _0x56905c.substring(0x0, 0xc8) + '...';
          }
          a1_0x35e38c.info("Response Data : " + _0x56905c);
          return _0x59ea50;
        } else {
          throw _0xf91471;
        }
      } catch (_0x533e8e) {
        if (_0x533e8e.status) {
          if (_0x533e8e.status == 0x194 || _0x533e8e.status == 0x1f7) {
            console.error("Detect API Change Stopping bot");
            throw Error("Detect API Change Stopping bot");
          }
          throw Error(_0x533e8e.response.status + " - " + _0x533e8e.response.statusText);
        }
        if (_0x533e8e.response) {
          throw Error(_0x533e8e.response.status + " - " + _0x533e8e.response.statusText);
        }
        throw Error('' + _0x533e8e.message);
      }
    }
  }