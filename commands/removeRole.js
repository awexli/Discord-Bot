module.exports = {
    name: 'role-',
    description: "Removes a role from a guild memeber",
    execute(message, args) {

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.reply("You don't have the permission to do that.");
        }

        if (!args.length || args.length > 2) {
            return message.reply(`\`p-role+\` \`<@username>\` \`<role>\``);
        }

        let gMember = message.mentions.members.first();
        if (!gMember) {
            return message.reply("Couldn't find that user.");
        }

        let roleName = args[1];
        var memberRole = message.guild.roles.find(role => role.name == roleName);
        if (!memberRole) {
            return message.reply("Couldnt find that role.");
        }

        gMember.removeRole(memberRole.id);
        message.reply(`\`${gMember.displayName}\` has been REMOVED from the role, \`${roleName}\``);
        
    },
};