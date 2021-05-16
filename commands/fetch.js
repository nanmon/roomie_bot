const nfetch = require('node-fetch');
const _template = require('lodash/template');

const DEFAULT_FORMAT = '<%= stringify(data) %>';
const functions = {
  stringify: json => JSON.stringify(json)
}

/**
 * 
 * @param {import('telegraf').Telegraf} bot 
 */
const fetch = (bot, commandName, {url, options, format = DEFAULT_FORMAT }) => {
  const formatter = _template(format, { imports: functions });
  bot.command(commandName, ctx => {
    nfetch(url, options).then(r => r.json()).then(data => {
      ctx.reply(formatter({ data }));
    });
  });
}

module.exports = fetch;