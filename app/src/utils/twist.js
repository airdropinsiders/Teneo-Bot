  import { Twisters } from 'twisters';
  import a6_0x98600b from './logger.js';
  import a6_0x1992e1 from '../core/core.js';
  import { accountLists } from '../../accounts/accounts.js';
  import { Helper } from './helper.js';
  export class Twist {
    constructor() {
      this.twisters = new Twisters();
    }
    async ['log'](_0x43edde = '', _0x20601e = '', _0x47ffd7 = new a6_0x1992e1(), _0xd6b251) {
      const _0x41878c = accountLists.find(_0x126ede => _0x126ede == _0x20601e);
      const _0x527649 = accountLists.indexOf(_0x41878c);
      if (_0xd6b251 == undefined) {
        a6_0x98600b.info("Account " + (_0x527649 + 0x1) + " - " + _0x43edde);
        _0xd6b251 = '-';
      }
      const _0x5876eb = _0x20601e.email ?? '-';
      const _0x33ad83 = _0x47ffd7.user ?? '-';
      const _0x184770 = _0x33ad83.id ?? '-';
      const _0x3a2da0 = _0x47ffd7.point ?? '-';
      const _0x2246ef = _0x3a2da0.pointsToday ?? '-';
      const _0x281d70 = _0x3a2da0.pointsTotal ?? '-';
      const _0x2d5dc1 = _0x33ad83.user_metadata ? _0x33ad83.user_metadata.invited_by : '-';
      let _0x20fab2 = {
        'msg': _0x43edde,
        'delay': _0xd6b251,
        'email': _0x5876eb,
        'id': _0x184770,
        'pointsToday': _0x2246ef,
        'pointsTotal': _0x281d70,
        'inviter': _0x2d5dc1
      };
      let _0x32eef6;
      _0x32eef6 = "\n================== Account " + (_0x527649 + 0x1) + " =================\n" + Helper.spinnerContent(_0x20fab2) + "\n==============================================\n";
      this.twisters.put(_0x41878c, {
        'text': _0x32eef6
      });
    }
    ['info'](_0x6249eb = '') {
      this.twisters.put(0x2, {
        'text': "\n==============================================\nInfo : " + _0x6249eb + "\n=============================================="
      });
      return;
    }
    ['clearInfo']() {
      this.twisters.remove(0x2);
    }
    ['clear'](_0x34c2f3) {
      this.twisters.remove(_0x34c2f3);
    }
  }