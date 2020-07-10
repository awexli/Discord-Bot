const Discord = require('discord.js');
module.exports = {
  name: 'role?',
  description: "Displays a guild member's role(s)",
  execute(message, args) {
    if (!args.length || args.length > 1) {
      return message.reply(`\`p-role?\` \`<@username>\``);
    }

    let gMember = message.mentions.members.first();
    if (!gMember) {
      return message.reply("Couldn't find that user.");
    }

    let embed = new Discord.RichEmbed()
      // ... all the other stuff ...
      .addField('Roles:', gMember.roles.map((r) => `${r}`).join(' | '), true);

    message.reply(embed);
  },
};
