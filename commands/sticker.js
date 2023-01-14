/**
 * 
 * @param {import('telegraf').Telegraf} bot 
 */
const sticker = (bot, commandName, fileId)=> {
  bot.command(commandName, ctx => {
    ctx.replyWithSticker(fileId)
  });
}

module.exports = sticker