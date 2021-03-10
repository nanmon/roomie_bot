const format = require('date-fns/format')
const { es } = require('date-fns/locale')
const { rrulestr } = require('rrule')

/**
 * 
 * @param {import('telegraf').Telegraf} bot 
 */
const chores = (bot, commandName, conf) => {
  const rule = rrulestr(conf.rrule);
  bot.command(commandName, ctx => {
    const args = ctx.message.text.split(' ');
    args.shift();
    const day = new Date(...args);
    const nextDay = rule.after(day, true);

    const days = rule.between(rule.options.dtstart, nextDay, true);
    const offset = days.length % conf.chores.length;
    const cleaningDay = days.pop();

    const choreList = conf.people.map((person, index) => {
      return `${person}: ${conf.chores[(index + offset) % conf.chores.length]}`
    });
    ctx.reply(
      "Roles del " + 
      format(cleaningDay, 'EEEE, dd LLLL', { locale: es }) + 
      "\n" +
      choreList.join('\n')
    );
  });
}

module.exports = chores