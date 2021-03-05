const Account = require('../db/models/account')
const validate = require('../util/validate')

/**
 * 
 * @param {import('telegraf').Context} ctx 
 */
async function aber(ctx) {
  const { message } = ctx;
  const { error, mentioned, sender } = validate.ahimuere(message);
  if (error) return ctx.reply(error);

  const account = await Account.createOrUpdate(
    sender.id, 
    mentioned.id, 
    0,
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

module.exports = aber