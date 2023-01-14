const fetch = require('node-fetch');

/**
 * 
 * @param {import('telegraf').Telegraf} bot 
 */
const eth = (bot, commandName, url) => {
  bot.command(commandName, ctx => {
    fetch(url).then(r => r.json()).then(({ ethereum }) => {
      ctx.reply(ethereum.usd + ' USD');
    });
  });
}

module.exports = eth;