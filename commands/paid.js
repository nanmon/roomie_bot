const Account = require('../db/models/account')
const validate = require('../util/validate')
const { senderAsUser, summaryMessage } = require('../util/format')

const validation = validate.args(validate.mention)

/**
 * 
 * @param {import('telegraf').Telegraf} bot 
 */
const paid = (bot, commandName) => {
  bot.command(commandName, async ctx => {
    const { message } = ctx;
    const args = validation(message);
    if (!args) return ctx.reply(`/${commandName} @\\mention`);
    const [ mentioned ] = args;
    const sender = senderAsUser(message.from);
  
    const account = await Account.setAccountTo(
      sender.id, 
      mentioned.id, 
      0
    );

    const names = {
      [sender.id]: sender.name,
      [mentioned.id]: mentioned.name
    };
    const res = summaryMessage(names, account)
    ctx.reply(res);
  });
}

module.exports = paid