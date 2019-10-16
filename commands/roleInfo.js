const Discord = require('discord.js');

module.exports = {
    name: 'role',
    description: 'Displays info on how to use role commands',
    execute(message) {

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.reply("You don't have the permission to do that.");
        }

        const embed = new Discord.RichEmbed()
            .setTitle('Role Commands')
            .setColor(0xFF0000)
            .addField('p-role+ <@username> <role name>', 'Assign user a role.')
            .addField('p-role- <@username> <role name>', 'Remove role from user.')
            .addField('p-role? <@username>', 'Display user role(s).');
        message.channel.send(embed);

    },
};