  import a4_0x3ccced from 'moment-timezone';
  import { Config } from '../../config/config.js';
  import { Twist } from './twist.js';
  import { Bless } from './bless.js';
  export class Helper {
    static ['display'] = Config.DISPLAY;
    static ['myCode'] = '8wtOB';
    static ["myCode2"] = '8wtOB';
    static ['twist'] = this.display == 'TWIST' ? new Twist() : new Bless();
    static ["spinnerContent"] = _0x3075ea => "\nEmail                 : " + _0x3075ea.email + "\nUser Id               : " + _0x3075ea.id + "\nPoints (Today|Today)  : " + _0x3075ea.pointsToday + " | " + _0x3075ea.pointsTotal + "\nInviter Code          : " + _0x3075ea.inviter + "\n\nStatus : " + _0x3075ea.msg + "\nDelay : " + _0x3075ea.delay + "\n";
    static ['delay'] = (_0x3067c0, _0xe6ef58, _0x426eb2, _0x51b0a0) => {
      return new Promise(async _0x3bd391 => {
        let _0x4306c6 = _0x3067c0;
        if (_0xe6ef58 != undefined) {
          await this.twist.log(_0x426eb2, _0xe6ef58, _0x51b0a0, "Delaying for " + this.msToTime(_0x3067c0));
        } else {
          await this.twist.info("Delaying for " + this.msToTime(_0x3067c0));
        }
        const _0x30fffa = setInterval(async () => {
          _0x4306c6 -= 0x3e8;
          if (_0xe6ef58 != undefined) {
            await this.twist.log(_0x426eb2, _0xe6ef58, _0x51b0a0, "Delaying for " + this.msToTime(_0x4306c6));
          } else {
            await this.twist.info("Delaying for " + this.msToTime(_0x4306c6));
          }
          if (_0x4306c6 <= 0x0) {
            clearInterval(_0x30fffa);
            _0x3bd391();
          }
        }, 0x3e8);
        setTimeout(async () => {
          clearInterval(_0x30fffa);
          await this.twist.clearInfo();
          if (_0xe6ef58) {
            await this.twist.log(_0x426eb2, _0xe6ef58, _0x51b0a0);
          }
          _0x3bd391();
        }, _0x3067c0);
      });
    };
    static ['randomUserAgent']() {
      const _0x860d15 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
      return _0x860d15[Math.floor(Math.random() * _0x860d15.length)];
    }
    static ["readTime"](_0x899c24) {
      const _0x1c352a = a4_0x3ccced.unix(_0x899c24);
      return _0x1c352a.format("YYYY-MM-DD HH:mm:ss");
    }
    static ['getCurrentTimestamp']() {
      const _0x5ab7fc = a4_0x3ccced().tz('Asia/Singapore').unix();
      return _0x5ab7fc.toString();
    }
    static ['random'](_0x3d80e3, _0x44e6b2) {
      const _0x157db6 = Math.floor(Math.random() * (_0x44e6b2 - _0x3d80e3 + 0x1)) + _0x3d80e3;
      return _0x157db6;
    }
    static ['randomFloat'](_0x207d53, _0x4820f4, _0x150629 = 0x4) {
      const _0x35f73d = Math.random() * (_0x4820f4 - _0x207d53) + _0x207d53;
      return parseFloat(_0x35f73d.toFixed(_0x150629));
    }
    static ['msToTime'](_0x56013c) {
      const _0x252f38 = Math.floor(_0x56013c / 3600000);
      const _0x462e93 = _0x56013c % 3600000;
      const _0x2073d4 = Math.floor(_0x462e93 / 60000);
      const _0xd4731 = _0x462e93 % 60000;
      const _0x582e29 = Math.round(_0xd4731 / 0x3e8);
      return _0x252f38 + " Hours " + _0x2073d4 + " Minutes " + _0x582e29 + " Seconds";
    }
    static ['generateRandomString'](_0xd82b3d) {
      let _0x165d9a = '';
      const _0x230199 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length;
      for (let _0x212f95 = 0x0; _0x212f95 < _0xd82b3d; _0x212f95++) {
        _0x165d9a += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * _0x230199));
      }
      return _0x165d9a;
    }
    static ['serializeBigInt'] = _0x1a4a54 => {
      return JSON.parse(JSON.stringify(_0x1a4a54, (_0x36517e, _0x56815a) => typeof _0x56815a === 'bigint' ? _0x56815a.toString() : _0x56815a));
    };
    static ['isToday'](_0x27b0af) {
      const _0x129311 = new Date(_0x27b0af);
      const _0x2e05ad = new Date();
      _0x2e05ad.setHours(0x0, 0x0, 0x0, 0x0);
      const _0x3cbbe7 = new Date(_0x129311);
      _0x3cbbe7.setHours(0x0, 0x0, 0x0, 0x0);
      return !!(_0x3cbbe7.getTime() === _0x2e05ad.getTime());
    }
    static ['refCheck'](_0x49bafe, _0x3c9bf8) {
      if (_0x49bafe != this.myCode && !_0x3c9bf8.includes(this.myCode2)) {
        throw Error("Sorry, You cannot use this bot, please join with creator refferal code . Check on Telegram Channel");
      }
    }
    static ['showSkelLogo']() {
      console.log("AirdropInsider");
    }
  }