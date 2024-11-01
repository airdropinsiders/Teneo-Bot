  import { Twisters } from 'twisters';
  import a6_0xf69588 from './logger.js';
  import a6_0x3be3ba from '../core/core.js';
  import { accountLists } from '../../accounts/accounts.js';
  import { Helper } from './helper.js';
  export class Twist {
    constructor() {
      this.twisters = new Twisters();
    }
    async ['log'](_0x342674 = '', _0x577b3d = '', _0x16015e = new a6_0x3be3ba(), _0x1b6c5f) {
      const _0x2c6d80 = accountLists.find(_0x3253f5 => _0x3253f5 == _0x577b3d);
      const _0x16cc5c = accountLists.indexOf(_0x2c6d80);
      if (_0x1b6c5f == undefined) {
        a6_0xf69588.info("Account " + (_0x16cc5c + 0x1) + " - " + _0x342674);
        _0x1b6c5f = '-';
      }
      const _0x34cd96 = _0x577b3d.email ?? '-';
      const _0xaafd70 = _0x16015e.user ?? '-';
      const _0x438cfd = _0xaafd70.id ?? '-';
      const _0x24a318 = _0x16015e.point ?? '-';
      const _0x29e557 = _0x24a318.pointsToday ?? '-';
      const _0x18a01c = _0x24a318.pointsTotal ?? '-';
      const _0x2c4142 = _0xaafd70.user_metadata ? _0xaafd70.user_metadata.invited_by : '-';
      let _0x57bdd7 = {
        'msg': _0x342674,
        'delay': _0x1b6c5f,
        'email': _0x34cd96,
        'id': _0x438cfd,
        'pointsToday': _0x29e557,
        'pointsTotal': _0x18a01c,
        'inviter': _0x2c4142
      };
      let _0x23b7e5;
      _0x23b7e5 = "\n================== Account " + (_0x16cc5c + 0x1) + " =================\n" + Helper.spinnerContent(_0x57bdd7) + "\n==============================================\n";
      this.twisters.put(_0x2c6d80, {
        'text': _0x23b7e5
      });
    }
    ["info"](_0x6b5293 = '') {
      this.twisters.put(0x2, {
        'text': "\n==============================================\nInfo : " + _0x6b5293 + "\n=============================================="
      });
      return;
    }
    ["clearInfo"]() {
      this.twisters.remove(0x2);
    }
    ['clear'](_0x18e3b7) {
      this.twisters.remove(_0x18e3b7);
    }
  }