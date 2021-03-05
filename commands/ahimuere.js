const Account = require('../db/models/account')
const validate = require('../util/validate')

/**
 * 
 * @param {import('telegraf').Context} ctx 
 */
async function ahimuere(ctx) {
  const { message } = ctx;
  const { error, mentioned, sender } = validate.ahimuere(message);
  if (error) return ctx.reply(error);

  const account = await Account.createOrUpdate(
    sender.id, 
    mentioned.id, 
    0,
  )
  account.amount = 0;
  await account.save();
  ctx.reply('Tablas 🤝');
}

module.exports = ahimuere