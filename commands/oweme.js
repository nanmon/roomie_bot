const Account = require('../db/models/account')
const validate = require('../util/validate')

/**
 * 
 * @param {import('telegraf').Telegraf} bot 
 */
const oweme = (bot, commandName) => {
  bot.command(commandName, async ctx => {
    const { message } = ctx;
    const { error, quantity, mentioned, sender } = validate.debt(message);
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
  });
}

module.exports = oweme