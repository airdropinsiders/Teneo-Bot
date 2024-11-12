  import a3_0x141b23 from 'blessed';
  import a3_0x9a7be6 from './logger.js';
  import a3_0x1f253f from '../core/core.js';
  import { Helper } from './helper.js';
  import { accountLists } from '../../accounts/accounts.js';
  export class Bless {
    constructor() {
      this.screen = a3_0x141b23.screen({
        'smartCSR': true
      });
      this.screen.title = "AirdropInsiderID";
      this.titleBox = a3_0x141b23.box({
        'top': 0x0,
        'left': 'center',
        'width': 'shrink',
        'height': 0x2,
        'tags': true,
        'content': "{center}TENEO NODE BOT{/center}\n    By: AirdropInsiderID",
        'style': {
          'fg': 'white',
          'bold': true
        }
      });
      this.screen.append(this.titleBox);
      this.subTitle = a3_0x141b23.box({
        'top': 0x1,
        'left': 'center',
        'width': 'shrink',
        'height': 0x2,
        'tags': true,
        'content': "By: AirdropInsiderID (https://t.me/AirdropInsiderID)",
        'style': {
          'fg': 'white',
          'bold': true
        }
      });
      this.screen.append(this.subTitle);
      this.tabList = a3_0x141b23.box({
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
      this.hintBox = a3_0x141b23.box({
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
      this.infoBox = a3_0x141b23.box({
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
      accountLists.forEach((_0x2d40bf, _0x496eb4) => {
        const _0x4221b6 = this.createAccountTab("Account " + (_0x496eb4 + 0x1));
        this.tabs.push(_0x4221b6);
        this.screen.append(_0x4221b6);
        _0x4221b6.hide();
      });
      if (this.tabs.length > 0x0) {
        this.tabs[0x0].show();
      }
      this.renderTabList();
      this.screen.key(['q', 'C-c'], () => {
        return process.exit(0x0);
      });
      this.screen.key(['left', 'right'], (_0x175201, _0x564c3a) => {
        if (_0x564c3a.name === 'right') {
          this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
        } else if (_0x564c3a.name === 'left') {
          this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
        }
      });
      this.screen.render();
    }
    ['createAccountTab'](_0x3e84c6) {
      return a3_0x141b23.box({
        'label': _0x3e84c6,
        'top': 0x6,
        'left': 0x0,
        'width': "100%",
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
    ['renderTabList']() {
      let _0x2d6f37 = '';
      accountLists.forEach((_0x277e05, _0x5eebee) => {
        if (_0x5eebee === this.currentTabIndex) {
          _0x2d6f37 += "{blue-fg}{bold} Account " + (_0x5eebee + 0x1) + " {/bold}{/blue-fg} ";
        } else {
          _0x2d6f37 += " Account " + (_0x5eebee + 0x1) + " ";
        }
      });
      this.tabList.setContent('{center}' + _0x2d6f37 + '{/center}');
      this.screen.render();
    }
    ['switchTab'](_0x2c77ff) {
      this.tabs[this.currentTabIndex].hide();
      this.currentTabIndex = _0x2c77ff;
      this.tabs[this.currentTabIndex].show();
      this.renderTabList();
      this.screen.render();
    }
    async ['log'](_0x117a0a = '', _0xeb1469 = '', _0x48ea0a = new a3_0x1f253f(), _0x5e22a6) {
      const _0x2115b4 = accountLists.find(_0x2096fb => _0x2096fb == _0xeb1469);
      const _0x58044c = accountLists.indexOf(_0x2115b4);
      if (_0x5e22a6 === undefined) {
        a3_0x9a7be6.info("Account " + (_0x58044c + 0x1) + " - " + _0x117a0a);
        _0x5e22a6 = '-';
      }
      let _0x2e8b72;
      const _0x1ad656 = _0xeb1469.email ?? '-';
      const _0x4cc976 = _0x48ea0a.user ?? {};
      const _0x4e5c64 = _0x4cc976.id ?? '-';
      const _0x14da37 = _0x48ea0a.point ?? '-';
      const _0x3eb31d = _0x14da37.pointsToday ?? '-';
      const _0x2b84e0 = _0x14da37.pointsTotal ?? '-';
      const _0x391abf = _0x4cc976.user_metadata ? _0x4cc976.user_metadata.invited_by : '-';
      let _0x333859 = {
        'msg': _0x117a0a,
        'delay': _0x5e22a6,
        'email': _0x1ad656,
        'id': _0x4e5c64,
        'pointsToday': _0x3eb31d,
        'pointsTotal': _0x2b84e0,
        'inviter': _0x391abf
      };
      _0x2e8b72 = '' + Helper.spinnerContent(_0x333859);
      this.tabs[_0x58044c].setContent(_0x2e8b72);
      this.screen.render();
    }
    ['info'](_0x1523ec = '') {
      const _0x20de01 = "\n{center}Info: " + _0x1523ec + "{/center}\n";
      this.infoBox.setContent(_0x20de01);
      this.screen.render();
    }
    ['clearInfo']() {
      this.infoBox.setContent('');
      this.screen.render();
    }
  }