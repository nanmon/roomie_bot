const { Telegraf } = require('telegraf');
const commands = require('./commands');
const config = require('./config.json');

const bot = new Telegraf(config.bot_token)

Object.entries(commands).forEach(([name, setup]) => {
  const args = config.commands[name];
  if (!args) return;
  setup(bot, ...args)
})

bot.launch().then(() => {
  console.log('Bot up 🦶');
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))