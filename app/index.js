  import { accountLists } from './accounts/accounts.js';
  import { proxyList } from './config/proxy_list.js';
  import a0_0x1cab9b from './src/core/core.js';
  import { Helper } from './src/utils/helper.js';
  import a0_0x516072 from './src/utils/logger.js';
  async function operation(_0x1075c5, _0x548d93) {
    const _0x1c7a9d = new a0_0x1cab9b(_0x1075c5, _0x548d93);
    try {
      await _0x1c7a9d.login();
      await _0x1c7a9d.getUser();
      await Helper.refCheck(_0x1c7a9d.user.user_metadata.invited_by, _0x1c7a9d.user.email);
      await _0x1c7a9d.connectWebSocket();
    } catch (_0x4bb007) {
      if (_0x4bb007.message) {
        await Helper.delay(0x2710, _0x1075c5, "Error : " + _0x4bb007.message + ", Retry again after 10 Second", _0x1c7a9d);
      } else {
        await Helper.delay(0x2710, _0x1075c5, "Error :" + JSON.stringify(_0x4bb007) + ", Retry again after 10 Second", _0x1c7a9d);
      }
      await operation(_0x1075c5, _0x548d93);
    }
  }
  async function startBot() {
    return new Promise(async (_0x12978f, _0x560f66) => {
      try {
        a0_0x516072.info("BOT STARTED");
        if (accountLists.length == 0x0) {
          throw Error("Please input your account first on accounts.js file");
        }
        if (proxyList.length != accountLists.length && proxyList.length != 0x0) {
          throw Error("You Have " + accountLists.length + " Accounts But Provide " + proxyList.length);
        }
        const _0x2b8661 = [];
        for (const _0xcc6949 of accountLists) {
          const _0x3e17e7 = accountLists.indexOf(_0xcc6949);
          const _0x310c58 = proxyList[_0x3e17e7];
          _0x2b8661.push(operation(_0xcc6949, _0x310c58));
        }
        await Promise.all(_0x2b8661);
        _0x12978f();
      } catch (_0x5714cb) {
        a0_0x516072.info("BOT STOPPED");
        a0_0x516072.error(JSON.stringify(_0x5714cb));
        _0x560f66(_0x5714cb);
      }
    });
  }
  (async () => {
    try {
      a0_0x516072.clear();
      a0_0x516072.info('');
      a0_0x516072.info("Application Started");
      console.log("TENEO NODE BOT");
      console.log();
      console.log("Join Channel : https://t.me/AirdropInsiderID");
      console.log("Dont forget to run git pull to keep up to date");
      console.log();
      console.log();
      Helper.showSkelLogo();
      await startBot();
    } catch (_0x2ffc5f) {
      console.log("Error During executing bot", _0x2ffc5f);
      await startBot();
    }
  })();