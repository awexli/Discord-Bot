const Discord = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Lists commands a user can execute',
  execute(message) {
    const embed = new Discord.RichEmbed()
      .setTitle('Commands')
      .setColor(0xff0000)
      .addField('p-vid', 'Shows a lists of commands for linking videos.')
      .addField(
        'p-prune <number>',
        'Clears the specified number of chat messages'
      )
      .addField(
        'p-avatar <@username>',
        'Get the avatar URL of the tagged user(s), or your own avatar.'
      )
      .addField('p-role', 'Shows a lists of commands for Role Management.');
    message.channel.send(embed);
  },
};
