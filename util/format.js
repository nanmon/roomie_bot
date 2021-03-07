const mentionAsUser = (mention, text) => {
  if (!mention) return null
  if (mention.type === 'text_mention')
    return { id: mention.user.id, name: text };
  if (mention.type === 'mention')
    return { id: text, name: text };
  return null;
}

const senderAsUser = sender => {
  if (sender.username) {
    const tag = '@' + sender.username
    return { id: tag, name: tag }
  }
  return {
    id: sender.id,
    name: sender.first_name
  }
}

const summaryMessage = (userNames, account) => {
  const total = account.amount;
  const userA = userNames[account.userA];
  const userB = userNames[account.userB];
  if (total > 0) return `Cuenta: ${total} a favor de ${userA}`;
  else if (total < 0) return `Cuenta: ${-total} a favor de ${userB}`;
  else return 'Tablas 🤝';
}

module.exports = { mentionAsUser, senderAsUser, summaryMessage }