module.exports = {
    name: 'role',
    description: "Assigns a guild member to role",
    execute(message, args) {

        // check for args.length>2 later
        if (!args.length) {
            return message.reply(`You didn't provide any arguments, ${message.author}!`);
        }

       let gMember = message.mentions.members.first();
       console.log(gMember);

        if (!gMember) {
            return message.reply("Couldn't find that user");
        }
       
        var memberRole = message.guild.roles.find(role => role.id == "632673225062613051");
        gMember.addRole(memberRole.id).then(console.log).catch(console.error);

    },
};