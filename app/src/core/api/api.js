  import { HttpsProxyAgent } from 'https-proxy-agent';
  import a1_0x54ee12 from 'node-fetch';
  import { Helper } from '../../utils/helper.js';
  import a1_0x323742 from '../../utils/logger.js';
  import { SocksProxyAgent } from 'socks-proxy-agent';
  export class API {
    constructor(_0x1da68a, _0x84559c) {
      this.url = _0x1da68a;
      this.proxy = _0x84559c;
      this.ua = Helper.randomUserAgent();
      this.subspaceApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlra25uZ3JneHV4Z2pocGxicGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0MzgxNTAsImV4cCI6MjA0MTAxNDE1MH0.DRAvf8nH1ojnJBc3rD_Nw6t1AV8X_g6gmY_HByG2Mag';
    }
    ['generateHeaders'](_0xf14676 = undefined) {
      const _0x5c9cd0 = {
        'Accept': "application/json, text/plain, */*",
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
        'Content-Type': 'application/json',
        'Sec-Fetch-Dest': "empty",
        'Sec-Fetch-Site': 'same-site',
        'Sec-Fetch-Mode': 'cors',
        'User-Agent': this.ua,
        'Apikey': this.subspaceApiKey
      };
      if (_0xf14676) {
        _0x5c9cd0.Authorization = "Bearer " + (_0xf14676.includes("Bearer ") ? _0xf14676.replace("Bearer ", '') : _0xf14676);
      } else {
        _0x5c9cd0.Authorization = "Bearer " + this.subspaceApiKey;
      }
      return _0x5c9cd0;
    }
    ['replaceSensitiveData'](_0x365b55) {
      if (this.something) {
        if (typeof this.something === 'string') {
          const _0x3edcf0 = new RegExp(this.something, 'g');
          return _0x365b55.replace(_0x3edcf0, '?????');
        } else if (Array.isArray(this.something)) {
          this.something.forEach(_0x165fb5 => {
            const _0x13c70d = new RegExp(_0x165fb5, 'g');
            _0x365b55 = _0x365b55.replace(_0x13c70d, '?????');
          });
        }
      }
      return _0x365b55;
    }
    async ['fetch'](_0x223784, _0x326214, _0x16e14f, _0x555d66 = {}, _0x27ff07 = {}, _0x5cd7c8 = false) {
      const _0x1845f1 = _0x5cd7c8 ? _0x223784 : '' + this.url + _0x223784;
      try {
        const _0x3021b7 = {
          ...this.generateHeaders(_0x16e14f),
          ..._0x27ff07
        };
        const _0x311ac2 = {
          'headers': _0x3021b7,
          'method': _0x326214,
          'referer': this.origin + '/'
        };
        a1_0x323742.info(_0x326214 + " : " + this.replaceSensitiveData(_0x1845f1) + " " + (this.proxy ? this.proxy : ''));
        for (let _0x265760 in _0x3021b7) {
          _0x3021b7[_0x265760] = this.replaceSensitiveData(_0x3021b7[_0x265760]);
        }
        a1_0x323742.info("Request Header : " + JSON.stringify(_0x3021b7));
        if (_0x326214 !== 'GET') {
          _0x311ac2.body = '' + JSON.stringify(_0x555d66);
          const _0x31d00e = this.replaceSensitiveData(_0x311ac2.body);
          a1_0x323742.info("Request Body : " + _0x31d00e);
        }
        if (this.proxy) {
          if (this.proxy.startsWith('http')) {
            _0x311ac2.agent = new HttpsProxyAgent(this.proxy, {
              'rejectUnauthorized': false
            });
          }
          if (this.proxy.startsWith('socks')) {
            _0x311ac2.agent = new SocksProxyAgent(this.proxy, {
              'rejectUnauthorized': false
            });
          }
        }
        const _0x3f84ff = await a1_0x54ee12(_0x1845f1, _0x311ac2);
        a1_0x323742.info("Response : " + _0x3f84ff.status + " " + _0x3f84ff.statusText);
        if (_0x3f84ff.ok || _0x3f84ff.status == 0x190 || _0x3f84ff.status == 0x193) {
          const _0x46d63 = _0x3f84ff.headers.get('content-type');
          let _0x540724;
          if (_0x46d63 && _0x46d63.includes('application/json')) {
            _0x540724 = await _0x3f84ff.json();
            _0x540724.status = _0x3f84ff.status;
          } else {
            _0x540724 = {
              'status': _0x3f84ff.status,
              'message': await _0x3f84ff.text()
            };
          }
          if (_0x3f84ff.ok) {
            _0x540724.status = 0xc8;
          }
          let _0x1a2731 = JSON.stringify(_0x540724);
          _0x1a2731 = this.replaceSensitiveData(_0x1a2731);
          if (_0x1a2731.length > 0xc8) {
            _0x1a2731 = _0x1a2731.substring(0x0, 0xc8) + "...";
          }
          a1_0x323742.info("Response Data : " + _0x1a2731);
          return _0x540724;
        } else {
          throw _0x3f84ff;
        }
      } catch (_0x391440) {
        if (_0x391440.status) {
          if (_0x391440.status == 0x194 || _0x391440.status == 0x1f7) {
            console.error("Detect API Change Stopping bot");
            throw Error("Detect API Change Stopping bot");
          }
          throw Error(_0x391440.response.status + " - " + _0x391440.response.statusText);
        }
        if (_0x391440.response) {
          throw Error(_0x391440.response.status + " - " + _0x391440.response.statusText);
        }
        throw Error('' + _0x391440.message);
      }
    }
  }