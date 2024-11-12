  import { accountLists } from './accounts/accounts.js';
  import { proxyList } from './config/proxy_list.js';
  import a0_0x40d5ac from './src/core/core.js';
  import { Helper } from './src/utils/helper.js';
  import a0_0x31cef9 from './src/utils/logger.js';
  async function operation(_0x4ba641, _0x34b9e8) {
    const _0x2bc985 = new a0_0x40d5ac(_0x4ba641, _0x34b9e8);
    try {
      await _0x2bc985.login();
      await _0x2bc985.getUser();
      //await Helper.refCheck(_0x2bc985.user.user_metadata.invited_by, _0x2bc985.user.email);
      await _0x2bc985.connectWebSocket();
    } catch (_0xd646) {
      if (_0xd646.message) {
        await Helper.delay(0x2710, _0x4ba641, "Error : " + _0xd646.message + ", Retry again after 10 Second", _0x2bc985);
      } else {
        await Helper.delay(0x2710, _0x4ba641, "Error :" + JSON.stringify(_0xd646) + ", Retry again after 10 Second", _0x2bc985);
      }
      await operation(_0x4ba641, _0x34b9e8);
    }
  }
  async function startBot() {
    return new Promise(async (_0x29f1d0, _0x29ba85) => {
      try {
        a0_0x31cef9.info("BOT STARTED");
        if (accountLists.length == 0x0) {
          throw Error("Please input your account first on accounts.js file");
        }
        if (proxyList.length != accountLists.length && proxyList.length != 0x0) {
          throw Error("You Have " + accountLists.length + " Accounts But Provide " + proxyList.length);
        }
        const _0x125816 = [];
        for (const _0x2bc5e4 of accountLists) {
          const _0x30b550 = accountLists.indexOf(_0x2bc5e4);
          const _0x211683 = proxyList[_0x30b550];
          _0x125816.push(operation(_0x2bc5e4, _0x211683));
        }
        await Promise.all(_0x125816);
        _0x29f1d0();
      } catch (_0x286bc8) {
        a0_0x31cef9.info("BOT STOPPED");
        a0_0x31cef9.error(JSON.stringify(_0x286bc8));
        _0x29ba85(_0x286bc8);
      }
    });
  }
  (async () => {
    try {
      a0_0x31cef9.clear();
      a0_0x31cef9.info('');
      a0_0x31cef9.info("Application Started");
      console.log("TENEO NODE BOT");
      console.log();
      console.log("Join Channel : https://t.me/AirdropInsiderID");
      console.log("Dont forget to run git pull to keep up to date");
      console.log();
      console.log();
      Helper.showSkelLogo();
      await startBot();
    } catch (_0x8553e0) {
      console.log("Error During executing bot", _0x8553e0);
      await startBot();
    }
  })();
