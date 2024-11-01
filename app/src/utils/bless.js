  import a3_0x19cb6f from 'blessed';
  import a3_0x4f95ba from './logger.js';
  import a3_0x17db43 from '../core/core.js';
  import { Helper } from './helper.js';
  import { accountLists } from '../../accounts/accounts.js';
  export class Bless {
    constructor() {
      this.screen = a3_0x19cb6f.screen({
        'smartCSR': true
      });
      this.screen.title = "AirdropInsider";
      this.titleBox = a3_0x19cb6f.box({
        'top': 0x0,
        'left': 'center',
        'width': 'shrink',
        'height': 0x2,
        'tags': true,
        'content': "{center}TENEO BOT{/center}\n    By: AirdropInsider",
        'style': {
          'fg': 'white',
          'bold': true
        }
      });
      this.screen.append(this.titleBox);
      this.subTitle = a3_0x19cb6f.box({
        'top': 0x1,
        'left': 'center',
        'width': 'shrink',
        'height': 0x2,
        'tags': true,
        'content': "By: Airdrop - Insider (https://t.me/AirdropInsiderID)",
        'style': {
          'fg': 'white',
          'bold': true
        }
      });
      this.screen.append(this.subTitle);
      this.tabList = a3_0x19cb6f.box({
        'top': 0x5,
        'left': 'center',
        'width': '100%',
        'height': 0x3,
        'tags': true,
        'style': {
          'fg': 'white'
        }
      });
      this.screen.append(this.tabList);
      this.hintBox = a3_0x19cb6f.box({
        'bottom': 0x0,
        'left': 'center',
        'width': '100%',
        'height': 0x3,
        'tags': true,
        'content': "{center}Use '->'(arrow right) and '<-'(arrow left) to switch between tabs{/center}",
        'style': {
          'fg': 'white'
        }
      });
      this.screen.append(this.hintBox);
      this.infoBox = a3_0x19cb6f.box({
        'bottom': 0x3,
        'left': 'center',
        'width': '100%',
        'height': 0x3,
        'tags': true,
        'content': '',
        'style': {
          'fg': 'white'
        }
      });
      this.screen.append(this.infoBox);
      this.tabs = [];
      this.currentTabIndex = 0x0;
      accountLists.forEach((_0x483468, _0x36a038) => {
        const _0x21a835 = this.createAccountTab("Account " + (_0x36a038 + 0x1));
        this.tabs.push(_0x21a835);
        this.screen.append(_0x21a835);
        _0x21a835.hide();
      });
      if (this.tabs.length > 0x0) {
        this.tabs[0x0].show();
      }
      this.renderTabList();
      this.screen.key(['q', 'C-c'], () => {
        return process.exit(0x0);
      });
      this.screen.key(['left', 'right'], (_0x374a10, _0x59a682) => {
        if (_0x59a682.name === 'right') {
          this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
        } else if (_0x59a682.name === 'left') {
          this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
        }
      });
      this.screen.render();
    }
    ['createAccountTab'](_0x2b88f9) {
      return a3_0x19cb6f.box({
        'label': _0x2b88f9,
        'top': 0x6,
        'left': 0x0,
        'width': '100%',
        'height': 'shrink',
        'border': {
          'type': 'line'
        },
        'style': {
          'fg': 'white',
          'border': {
            'fg': '#f0f0f0'
          }
        },
        'tags': true
      });
    }
    ["renderTabList"]() {
      let _0x37c5af = '';
      accountLists.forEach((_0x5f32e6, _0x27caa1) => {
        if (_0x27caa1 === this.currentTabIndex) {
          _0x37c5af += "{blue-fg}{bold} Account " + (_0x27caa1 + 0x1) + " {/bold}{/blue-fg} ";
        } else {
          _0x37c5af += " Account " + (_0x27caa1 + 0x1) + " ";
        }
      });
      this.tabList.setContent('{center}' + _0x37c5af + '{/center}');
      this.screen.render();
    }
    ['switchTab'](_0x153d8b) {
      this.tabs[this.currentTabIndex].hide();
      this.currentTabIndex = _0x153d8b;
      this.tabs[this.currentTabIndex].show();
      this.renderTabList();
      this.screen.render();
    }
    async ['log'](_0x2cf699 = '', _0x127373 = '', _0x15657f = new a3_0x17db43(), _0x531105) {
      const _0x2b8b92 = accountLists.find(_0x1fc5ff => _0x1fc5ff == _0x127373);
      const _0x2ec33b = accountLists.indexOf(_0x2b8b92);
      if (_0x531105 === undefined) {
        a3_0x4f95ba.info("Account " + (_0x2ec33b + 0x1) + " - " + _0x2cf699);
        _0x531105 = '-';
      }
      let _0xaba796;
      const _0x343a0b = _0x127373.email ?? '-';
      const _0x3a7088 = _0x15657f.user ?? {};
      const _0x4d8f2b = _0x3a7088.id ?? '-';
      const _0x11edcc = _0x15657f.point ?? '-';
      const _0x19563b = _0x11edcc.pointsToday ?? '-';
      const _0xd3c709 = _0x11edcc.pointsTotal ?? '-';
      const _0x389610 = _0x3a7088.user_metadata ? _0x3a7088.user_metadata.invited_by : '-';
      let _0x280837 = {
        'msg': _0x2cf699,
        'delay': _0x531105,
        'email': _0x343a0b,
        'id': _0x4d8f2b,
        'pointsToday': _0x19563b,
        'pointsTotal': _0xd3c709,
        'inviter': _0x389610
      };
      _0xaba796 = '' + Helper.spinnerContent(_0x280837);
      this.tabs[_0x2ec33b].setContent(_0xaba796);
      this.screen.render();
    }
    ['info'](_0x22b1ab = '') {
      const _0x4eeb3d = "\n{center}Info: " + _0x22b1ab + "{/center}\n";
      this.infoBox.setContent(_0x4eeb3d);
      this.screen.render();
    }
    ['clearInfo']() {
      this.infoBox.setContent('');
      this.screen.render();
    }
  }