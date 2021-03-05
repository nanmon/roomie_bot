const { Telegraf } = require('telegraf');
const commands = require('./commands');
const config = require('./config.json');

const bot = new Telegraf(config.bot_token)

bot.command('quit', (ctx) => {
  // Using context shortcut
  ctx.leaveChat()
})
bot.command(
  config.sticker_command.name, 
  commands.sticker(config.sticker_command.file_id)
);
bot.command('dame', commands.dame)

bot.launch().then(() => {
  console.log('Bot up 🦶');
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))