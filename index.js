const { Telegraf } = require('telegraf');
const commands = require('./commands');
const config = require('./config.json');

const bot = new Telegraf(config.bot_token)

if (config.version === '2') {
  setupV2();
} else {
  setupV1();
}

bot.launch().then(() => {
  console.log('Bot up 🦶');
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

function setupV1() {
  Object.entries(commands).forEach(([name, setup]) => {
    const args = config.commands[name];
    if (!args) return;
    setup(bot, ...args)
  });
}

function setupV2() {
  Object.entries(config.commands).forEach(([rename, config]) => {
    const [name, ...restConfig] = config;
    commands[name](bot, rename, ...restConfig);
  });
}