const Discord = require('discord.js');

module.exports = {
  name: 'server',
  description: 'Gets information about the server',
  execute(message) {
    const embed = new Discord.RichEmbed()
      .setTitle(`Server Info`)
      .addField(`Server name:`, message.guild.name, true)
      .addField(`Total members:`, message.guild.memberCount, true)
      .addField(`Members:`, message.author.username)
      .addBlankField()
      .setTimestamp();

    message.channel.send(embed);
  },
};
