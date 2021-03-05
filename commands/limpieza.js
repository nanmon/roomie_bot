const { people, chores } = require('../config.json');
const format = require('date-fns/format')
const { es } = require('date-fns/locale')

const DAY = 1000 * 60 * 60 * 24
const WEEK = DAY * 7;
/**
 * 
 * @param {import('telegraf').Context} ctx 
 */
function limpieza(ctx) {
  const args = ctx.message.text.split(' ');
  args.shift();
  const day = new Date(...args)
  const offIndex = Math.floor(day.valueOf() / WEEK * 2); //twice a week
  const dayOffset = DAY * 3
  const cleaningDay = new Date(WEEK / 2 * offIndex + dayOffset);
  const offset = offIndex % chores.length;
  const choreList = people.map((person, index) => {
    return `${person}: ${chores[(index + offset) % chores.length]}`
  });
  ctx.reply(
    "Roles del " + 
    format(cleaningDay, 'EEEE, dd LLLL', {locale: es }) + 
    "\n" +
    choreList.join('\n')
  );
}

module.exports = limpieza