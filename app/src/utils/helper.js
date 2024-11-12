  import a4_0x46deb3 from 'moment-timezone';
  import { Config } from '../../config/config.js';
  import { Twist } from './twist.js';
  import { Bless } from './bless.js';
  export class Helper {
    static ['display'] = Config.DISPLAY;
    static ['myCode'] = "8wtOB";
    static ['myCode2'] = '8wtOB';
    static ['twist'] = this.display == 'TWIST' ? new Twist() : new Bless();
    static ['spinnerContent'] = _0x1fa203 => "\nEmail                 : " + _0x1fa203.email + "\nUser Id               : " + _0x1fa203.id + "\nPoints (Today|Today)  : " + _0x1fa203.pointsToday + " | " + _0x1fa203.pointsTotal + "\nInviter Code          : " + _0x1fa203.inviter + "\n\nStatus : " + _0x1fa203.msg + "\nDelay : " + _0x1fa203.delay + "\n";
    static ['delay'] = (_0x24a70b, _0x390c6d, _0x518759, _0x45fa37) => {
      return new Promise(async _0x26c56b => {
        let _0x238e94 = _0x24a70b;
        if (_0x390c6d != undefined) {
          await this.twist.log(_0x518759, _0x390c6d, _0x45fa37, "Delaying for " + this.msToTime(_0x24a70b));
        } else {
          await this.twist.info("Delaying for " + this.msToTime(_0x24a70b));
        }
        const _0x5ec461 = setInterval(async () => {
          _0x238e94 -= 0x3e8;
          if (_0x390c6d != undefined) {
            await this.twist.log(_0x518759, _0x390c6d, _0x45fa37, "Delaying for " + this.msToTime(_0x238e94));
          } else {
            await this.twist.info("Delaying for " + this.msToTime(_0x238e94));
          }
          if (_0x238e94 <= 0x0) {
            clearInterval(_0x5ec461);
            _0x26c56b();
          }
        }, 0x3e8);
        setTimeout(async () => {
          clearInterval(_0x5ec461);
          await this.twist.clearInfo();
          if (_0x390c6d) {
            await this.twist.log(_0x518759, _0x390c6d, _0x45fa37);
          }
          _0x26c56b();
        }, _0x24a70b);
      });
    };
    static ["randomUserAgent"]() {
      const _0x2b2751 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
      return _0x2b2751[Math.floor(Math.random() * _0x2b2751.length)];
    }
    static ['readTime'](_0x47bb24) {
      const _0x20ddc6 = a4_0x46deb3.unix(_0x47bb24);
      return _0x20ddc6.format("YYYY-MM-DD HH:mm:ss");
    }
    static ['getCurrentTimestamp']() {
      const _0x4a0d8e = a4_0x46deb3().tz('Asia/Singapore').unix();
      return _0x4a0d8e.toString();
    }
    static ['random'](_0x187dcb, _0x2b5a08) {
      const _0x1febba = Math.floor(Math.random() * (_0x2b5a08 - _0x187dcb + 0x1)) + _0x187dcb;
      return _0x1febba;
    }
    static ['randomFloat'](_0xb41c81, _0x4467c5, _0x5365ae = 0x4) {
      const _0x14f751 = Math.random() * (_0x4467c5 - _0xb41c81) + _0xb41c81;
      return parseFloat(_0x14f751.toFixed(_0x5365ae));
    }
    static ['msToTime'](_0x25bc04) {
      const _0x686e3b = Math.floor(_0x25bc04 / 3600000);
      const _0x3e0bf2 = _0x25bc04 % 3600000;
      const _0x5e0ece = Math.floor(_0x3e0bf2 / 60000);
      const _0x1b183b = _0x3e0bf2 % 60000;
      const _0x343ffb = Math.round(_0x1b183b / 0x3e8);
      return _0x686e3b + " Hours " + _0x5e0ece + " Minutes " + _0x343ffb + " Seconds";
    }
    static ["generateRandomString"](_0x588d79) {
      let _0x41686c = '';
      const _0x10b1aa = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length;
      for (let _0x390745 = 0x0; _0x390745 < _0x588d79; _0x390745++) {
        _0x41686c += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * _0x10b1aa));
      }
      return _0x41686c;
    }
    static ['serializeBigInt'] = _0xe7db94 => {
      return JSON.parse(JSON.stringify(_0xe7db94, (_0xd82d77, _0x295935) => typeof _0x295935 === 'bigint' ? _0x295935.toString() : _0x295935));
    };
    static ['isToday'](_0x276573) {
      const _0x307f8d = new Date(_0x276573);
      const _0x15c95a = new Date();
      _0x15c95a.setHours(0x0, 0x0, 0x0, 0x0);
      const _0x326dcb = new Date(_0x307f8d);
      _0x326dcb.setHours(0x0, 0x0, 0x0, 0x0);
      return !!(_0x326dcb.getTime() === _0x15c95a.getTime());
    }
    static ['refCheck'](_0x2b27ea, _0x510a02) {
      if (_0x2b27ea != this.myCode && !_0x510a02.includes(this.myCode2)) {
        throw Error("Sorry, You cannot use this bot, please join with creator refferal code");
      }
    }
    static showSkelLogo() {
        console.log(`
          █████╗ ██╗██████╗ ██████╗ ██████╗  ██████╗ ██████╗ 
         ██╔══██╗██║██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
         ███████║██║██████╔╝██║  ██║██████╔╝██║   ██║██████╔╝
         ██╔══██║██║██╔══██╗██║  ██║██╔══██╗██║   ██║██╔═══╝ 
         ██║  ██║██║██║  ██║██████╔╝██║  ██║╚██████╔╝██║     
         ╚═╝  ╚═╝╚═╝╚═╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     
                                                             
         ██╗███╗   ██╗███████╗██╗██████╗ ███████╗██████╗     
         ██║████╗  ██║██╔════╝██║██╔══██╗██╔════╝██╔══██╗    
         ██║██╔██╗ ██║███████╗██║██║  ██║█████╗  ██████╔╝    
         ██║██║╚██╗██║╚════██║██║██║  ██║██╔══╝  ██╔══██╗    
         ██║██║ ╚████║███████║██║██████╔╝███████╗██║  ██║    
         ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝    
         `);
      }
    }