const { mentionAsUser } = require('./format')

const number = arg => {
  const asNum = Number(arg);
  if (isNaN(asNum)) return null;
  return asNum;
}

/**
 * 
 * @param {import('telegraf/src/telegram-types').Message.TextMessage} message 
 */
const mention = (arg, message) => {
  const indexOfArg = message.text.indexOf(arg);
  const mention = message.entities.find(entity => {
    return entity.offset === indexOfArg
  });
  return mentionAsUser(mention, arg);
}

/**
 * 
 * @param {import('telegraf/src/telegram-types').Message.TextMessage} message 
 */
const args = (...fns) => (message) => {
  const splits = message.text.split(' ')
  splits.shift(); // command
  if (splits.length !== fns.length) return null
  const res = fns.map((fn, i) => fn(splits[i], message))
  if (res.indexOf(null) !== -1) return null;
  return res;
}

const compose = (...fns) => message => {
  return fns.reduce((prev, fn) => fn(prev, message), message);
}

const or = (...fns) => message => {
  return fns.find(fn => fn(message))
}

module.exports = { number, mention, args, compose, or }