const Account = require('../db/models/account')

/**
 * 
 * @param {import('telegraf').Context} ctx 
 */
async function dame(ctx) {
  const { message } = ctx;
  const { error, quantity, mentioned, sender } = validate(message);
  if (error) return ctx.reply(error);

  const account = await Account.createOrUpdate(
    sender.id, 
    mentioned.id, 
    quantity
  )
  
  let userA = sender, userB = mentioned
  if (account.userA === mentioned.id) {
    userA = mentioned, userB = sender
  }
  const total = account.amount
  if (total > 0) ctx.reply(`Cuenta: ${total} a favor de ${userA.name}`);
  else if (total < 0) ctx.reply(`Cuenta: ${-total} a favor de ${userB.name}`);
  else ctx.reply('Tablas 🤝');
}

/**
 * 
 * @param {import('telegraf/src/telegram-types').Message.TextMessage} message 
 */
 function validate(message) {
  if (message.entities == null) return {error: 'A quien ps?'};
  if (message.entities.length !== 2) return {error: 'Taggea a 1 y ya'};
  const [_bot_command, mention] = message.entities;
  if (!['text_mention', 'mention'].includes(mention.type)) 
    return {error: 'Todo mal escroto'};
  const args = message.text.split(' ');
  if (args.length !== 3) return {error: '/command cantidad @quien'};
  const quantity = Number(args[1]);
  if (isNaN(quantity)) return {error: 'pishi NaN'};

  const mentionedUserName = args[2];
  const mentioned = { 
    id: mention.type === 'text_mention' ? mention.user.id : mentionedUserName,
    name: mentionedUserName
  }
  const sender = {
    id: message.from.id,
    name: message.from.username ? '@' + message.from.username : message.from.first_name
  }
  return { quantity, mentioned, sender }
}

module.exports = dame