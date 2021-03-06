const { Telegraf } = require('telegraf');
const commands = require('./commands');
const config = require('./config.json');

const bot = new Telegraf(config.bot_token)

// bot.command('quit', (ctx) => {
//   // Using context shortcut
//   ctx.leaveChat()
// })
// bot.command(
//   config.sticker_command.name, 
//   commands.sticker(config.sticker_command.file_id)
// );
// bot.command('dame', commands.dame)
// bot.command('tedebo', commands.tedebo)
// bot.command('ahimuere', commands.ahimuere)
// bot.command('aber', commands.aber)
// bot.command('limpieza', commands.limpieza)

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