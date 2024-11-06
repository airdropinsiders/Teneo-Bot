import { accountLists } from './accounts/accounts.js';
import { proxyList } from './config/proxy_list.js';
import a0_0x1cab9b from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x516072 from './src/utils/logger.js';

async function operation(account, proxy) {
  const botInstance = new a0_0x1cab9b(account, proxy);
  try {
    await botInstance.login();
    await botInstance.getUser();
    await Helper.refCheck(botInstance.user.user_metadata.invited_by, botInstance.user.email);
    await botInstance.connectWebSocket();
  } catch (error) {
    if (error.message) {
      await Helper.delay(10000, account, "Error: " + error.message + ", Retry again after 10 seconds", botInstance);
    } else {
      await Helper.delay(10000, account, "Error: " + JSON.stringify(error) + ", Retry again after 10 seconds", botInstance);
    }
    await Helper.delay(10000); // Delay before retrying
    await operation(account, proxy);
  }
}

async function startBot() {
  return new Promise(async (resolve, reject) => {
    try {
      a0_0x516072.info("BOT STARTED");
      if (accountLists.length === 0) {
        throw new Error("Please input your account first in accounts.js file");
      }
      if (proxyList.length !== accountLists.length && proxyList.length !== 0) {
        throw new Error("You have " + accountLists.length + " accounts but provided " + proxyList.length + " proxies.");
      }

      for (let index = 0; index < accountLists.length; index++) {
        const account = accountLists[index];
        const proxy = proxyList[index];
        await operation(account, proxy);
        await Helper.delay(30000); // Delay for 500ms between operations
      }

      resolve();
    } catch (error) {
      a0_0x516072.info("BOT STOPPED");
      a0_0x516072.error(JSON.stringify(error));
      reject(error);
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
    console.log("Join Channel: https://t.me/AirdropInsiderID");
    console.log("Don't forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (error) {
    console.log("Error during executing bot", error);
    await startBot();
  }
})();
