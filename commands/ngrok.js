const fetch = require('node-fetch');

/**
 * 
 * @param {import('telegraf').Telegraf} bot 
 */
const ngrok = (bot, commandName, apiKey) => {
  bot.command(commandName, ctx => {
    fetch('https://api.ngrok.com/tunnels', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Ngrok-Version': '2'
      }
    }).then(r => r.json()).then(({ tunnels }) => {
      const channel = ctx.message.text.split(' ')[1] || 'stable';
      const tun = tunnels.find(t => t.metadata === channel);
      if (!tun) {
        return ctx.reply('noai ip')
      }
      const ip = tun.public_url.split('//').pop()
      ctx.reply(ip);
    }).catch(() => {
      ctx.reply('tronikis :c')
    });
  });
}

module.exports = ngrok;