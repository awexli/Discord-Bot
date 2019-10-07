const kick = require('../commands/kick')
const vid = require('../commands/vid')
const help = require('../commands/help')

const PREFIX = '!';

module.exports = (client, message) => {
    let args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
        case 'kick':
            return kick(message)
        case 'vid':
            return vid(message)
        case 'avatar':
            message.reply(message.author.avatarURL);
            break;
        case 'help':
            return help(message)
        case 'clear':
            if (!args[1])
                return message.reply('Define how many messages you want to clear.')
            message.channel.bulkDelete(args[1]);
            break;
        default:
            break;
    }
}