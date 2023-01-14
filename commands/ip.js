const internalIp = require('internal-ip')

/**
 * 
 * @param {import('telegraf').Telegraf} bot 
 */
const ip = (bot, commandName, url) => {
  bot.command(commandName, async ctx => {
    const ipv4 = await internalIp.v4();
    ctx.reply(ipv4);
  });
}

module.exports = ip;
