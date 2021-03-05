const Account = require('../db/models/account')
const validate = require('../util/validate')

/**
 * 
 * @param {import('telegraf').Context} ctx 
 */
async function tedebo(ctx) {
  const { message } = ctx;
  const { error, quantity, mentioned, sender } = validate.debt(message);
  if (error) return ctx.reply(error);

  const account = await Account.createOrUpdate(
    mentioned.id, 
    sender.id, 
    quantity
  )
  
  let userA = mentioned, userB = sender
  if (account.userA === sender.id) {
    userA = sender, userB = mentioned
  }
  const total = account.amount
  if (total > 0) ctx.reply(`Cuenta: ${total} a favor de ${userA.name}`);
  else if (total < 0) ctx.reply(`Cuenta: ${-total} a favor de ${userB.name}`);
  else ctx.reply('Tablas 🤝');
}

module.exports = tedebo