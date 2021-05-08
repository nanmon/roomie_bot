const Account = require('../db/models/account')
const validate = require('../util/validate')
const { senderAsUser, summaryMessage } = require('../util/format')

const validation = validate.or(
  validate.args(validate.mention),
  validate.args()
)

/**
 * 
 * @param {import('telegraf').Telegraf} bot 
 */
const summary = (bot, commandName) => {
  bot.command(commandName, async ctx => {
    const { message } = ctx;
    const args = validation(message);
    if (args == null) return ctx.reply(`/${commandName} @\\mention`);
    const [ mentioned ] = args;
    const sender = senderAsUser(message.from);
    if (mentioned) {
      const account = await Account.findByUsers(
        sender.id, 
        mentioned.id
      );
  
      const names = {
        [sender.id]: sender.name,
        [mentioned.id]: mentioned.name
      };
      const res = summaryMessage(names, account)
      ctx.reply(res);
    } else {
      const summaries = (await Account.whereUser(sender.id)).map(account => {
        if(account.userA === sender.id) {
          return `${account.userB.substr(1)}: ${account.amount}`
        } else {
          return `${account.userA.substr(1)}: ${-account.amount}`
        }
      }).join('\n');
      ctx.reply(`
        Paguenle al ${sender.name}:\n${summaries}
      `)
    }
  });
}

module.exports = summary