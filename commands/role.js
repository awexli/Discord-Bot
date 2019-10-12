module.exports = {
    name: 'role',
    description: "Assigns a guild member to role",
    execute(message, args) {

        // check for permission later
        if (!args.length || args.length > 2) {
            return message.reply(`\`p-role\` \`<@username>\` \`<role>\``);
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

        gMember.addRole(memberRole.id);

        message.reply(`\`${gMember.displayName}\` has been added to the role, \`${roleName}\``);


    },
};