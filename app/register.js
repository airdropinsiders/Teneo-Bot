import fs from 'fs/promises';
import yaml from 'js-yaml';
import axios from 'axios';
import chalk from 'chalk';

const signupUrl = "https://ikknngrgxuxgjhplbpey.supabase.co/auth/v1/signup";
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlra25uZ3JneHV4Z2pocGxicGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0MzgxNTAsImV4cCI6MjA0MTAxNDE1MH0.DRAvf8nH1ojnJBc3rD_Nw6t1AV8X_g6gmY_HByG2Mag";

async function registerUser(email, password) {
    try {
      const response = await axios.post(signupUrl, {
        email: email,
        password: password,
        data: { invited_by: "8wtOB" }
      }, {
        headers: {
          'apikey': apikey
        }
      });
      console.log(chalk.green(`Registration successful for: ${email}`));
    } catch (error) {
      console.error(chalk.red(`Error for ${email}:`, error.response ? error.response.data : error.message));
    }
  }
  
  async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function processAccounts() {
    try {
      const fileContent = await fs.readFile('./accounts/accounts.yaml', 'utf-8');
      const accountData = yaml.load(fileContent);
      const accounts = accountData.accounts;
  
      for (const account of accounts) {
        const [email, password] = account.email.split(':');
        const proxy = account.proxy;
  
        if (email && password && proxy) {
          await registerUser(email, password);
          console.log(chalk.cyan(`Waiting for 5 seconds before registering the next email...`));
          await delay(5000); // Delay of 5 seconds
        } else {
          console.warn(chalk.yellow(`Skipping invalid entry: ${JSON.stringify(account)}`));
        }
      }
    } catch (error) {
      console.error(chalk.red('Error reading account file:'), error.message);
    }
  }
  
  processAccounts();