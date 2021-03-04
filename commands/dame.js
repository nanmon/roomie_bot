/**
 * 
 * @param {import('telegraf').Context} ctx 
 */
export function dame(ctx) {
  const { message } = ctx;
  const err = validate(message);
  if (err) return ctx.reply(err);

  const mention = message.entities[1];
  console.log(mention, mention.user);
  const args = message.text.split(' ')
  let quantity = Number(args[1])
  const mentionedUserName = args[2];
  const mentionUser = { 
    id: mention.type === 'text_mention' ? mention.user.id : mentionedUserName,
    name: mentionedUserName
  }
  const sender = {
    id: message.from.id,
    name: message.from.username ? '@' + message.from.username : message.from.first_name
  }
  const [userA, userB] = [sender, mentionUser].sort((a, b) => a.id - b.id);
  const isOwner = userA.id === sender.id;
  const cId = `${userA.id}:${userB.id}`;

  if (!isOwner) quantity *= -1;

  if (!cuentas[cId]) cuentas[cId] = quantity;
  else cuentas[cId] += quantity;

  if (cuentas[cId] > 0) ctx.reply(`Cuenta: ${cuentas[cId]} a favor de ${userA.name}`);
  else if (cuentas[cId] < 0) ctx.reply(`Cuenta: ${-cuentas[cId]} a favor de ${userB.name}`);
  else ctx.reply('Tablas 🤝');
}

const cuentas = [];

/**
 * 
 * @param {import('telegraf/src/telegram-types').Message.TextMessage} message 
 */
 function validate(message) {
  if (message.entities == null) return 'A quien ps?';
  if (message.entities.length !== 2) return 'Taggea a 1 y ya';
  const [_bot_command, mention] = message.entities;
  if (!['text_mention', 'mention'].includes(mention.type)) return 'Todo mal escroto';
  const args = message.text.split(' ');
  if (args.length !== 3) return '/command cantidad @quien';
  const quantity = Number(args[1]);
  if (isNaN(quantity)) return 'pishi NaN';
}