
/**
 * 
 * @param {import('telegraf/src/telegram-types').Message.TextMessage} message 
 */
 function debt(message) {
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
    id: message.from.username ? '@' + message.from.username : message.from.id,
    name: message.from.username ? '@' + message.from.username : message.from.first_name
  }
  return { quantity, mentioned, sender }
}

/**
 * 
 * @param {import('telegraf/src/telegram-types').Message.TextMessage} message 
 */
 function ahimuere(message) {
  if (message.entities == null) return {error: 'A quien ps?'};
  if (message.entities.length !== 2) return {error: 'Taggea a 1 y ya'};
  const [_bot_command, mention] = message.entities;
  if (!['text_mention', 'mention'].includes(mention.type)) 
    return {error: 'Todo mal escroto'};
  const args = message.text.split(' ');
  if (args.length !== 2) return {error: '/ahimuere @quien'};

  const mentionedUserName = args[1];
  const mentioned = { 
    id: mention.type === 'text_mention' ? mention.user.id : mentionedUserName,
    name: mentionedUserName
  }
  const sender = {
    id: message.from.username ? '@' + message.from.username : message.from.id,
    name: message.from.username ? '@' + message.from.username : message.from.first_name
  }
  return { mentioned, sender }
}

module.exports = { debt, ahimuere }