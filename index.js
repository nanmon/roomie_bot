const { Telegraf } = require('telegraf');
const commands = require('./commands');
const config = require('./config.json');

const bot = new Telegraf(config.BOT_TOKEN)

bot.command('quit', (ctx) => {
  // Using context shortcut
  ctx.leaveChat()
})
bot.command(
  config.STICKER_COMMAND.name, 
  commands.sticker(config.STICKER_COMMAND.file_id)
);
bot.command('dame', commands.dame)

bot.launch().then(() => {
  console.log('Bot up 🦶');
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))