const { Telegraf } = require('telegraf');
const config = require('./config.json');

const bot = new Telegraf(config.BOT_TOKEN)

bot.command('quit', (ctx) => {
  // Using context shortcut
  ctx.leaveChat()
})

bot.on('text', (ctx) => {
  // Using context shortcut
  ctx.reply(`Hello ${ctx.message.from.first_name}`)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))