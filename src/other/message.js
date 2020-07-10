const kick = require('./kick');
const vid = require('./vid');
const help = require('./help');
const avatar = require('../commands/avatar');

const PREFIX = '_';

module.exports = (client, message) => {
  if (!message.guild) return;
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  let args = message.content.substring(PREFIX.length).split(' ');

  switch (args[0]) {
    case 'kick':
      return kick(message);
    case 'vid':
      return vid(message);
    case 'avatar':
      return avatar(message);
    case 'help':
      return help(message);
    case 'clear':
      if (!args[1])
        return message.reply('Define how many messages you want to clear.');
      message.channel.bulkDelete(args[1]);
      break;
    default:
      break;
  }
};
