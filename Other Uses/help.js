const Discord = require('discord.js');

module.exports = message => {
    const embed = new Discord.RichEmbed()
        .setTitle('Commands')
        .setColor(0xFF0000)
        .addField('!vid', 'Links to a random video')
        .addField('!clear <number>', 'Clears the specified number of chat messages')
        .addField('!avatar', 'Links the users avatar');
    message.channel.send(embed);
}