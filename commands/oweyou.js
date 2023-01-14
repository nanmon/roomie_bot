const Account = require('../db/models/account')
const validate = require('../util/validate')
const { senderAsUser, summaryMessage } = require('../util/format')

const validation = validate.args(
  validate.number,
  validate.mention
)

/**
 * 
 * @param {import('telegraf').Telegraf} bot 
 */
const oweyou = (bot, commandName) => {
  bot.command(commandName, async ctx => {
    const { message } = ctx;
    const args = validation(message);
    if (!args) return ctx.reply(`/${commandName} amount @\\mention`);
    const [ quantity, mentioned ] = args;
    const sender = senderAsUser(message.from);
  
    const account = await Account.addToAccount(
      sender.id, 
      mentioned.id, 
      -quantity
    );

    const names = {
      [sender.id]: sender.name,
      [mentioned.id]: mentioned.name
    };
    const res = summaryMessage(names, account)
    ctx.reply(res);
  });
}

module.exports = oweyou