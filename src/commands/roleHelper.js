function roleCheck(message, args, commandName) {
  if (!message.member.hasPermission('MANAGE_ROLES')) {
    return message.reply("You don't have the permission to do that.");
  }

  if (!args.length || args.length > 2) {
    return message.reply(`\`p-role+\` \`<@username>\` \`<role>\``);
  }

  const guildMember = message.mentions.members.first();
  if (!guildMember) {
    return message.reply(
      `Couldn't find that user. \n` +
        `Try: \`p-role<+/->\` \`<@username>\` \`<role>\``
    );
  }

  let roleName = args[1];
  const memberRole = message.guild.roles.find((role) => role.name == roleName);
  if (!memberRole) {
    return message.reply('Couldnt find that role.');
  }

  var _hasRole = false;
  guildMember.roles.map((r) => {
    if (r === memberRole) {
      _hasRole = true;
      return;
    }
  });

  if (commandName === 'role-' && _hasRole == true) {
    guildMember.removeRole(memberRole);
    return message.reply(
      `\`${guildMember.displayName}\` has been REMOVED from the role, \`${memberRole.name}\``
    );
  }

  if (commandName === 'role+' && _hasRole !== true) {
    guildMember.addRole(memberRole);
    return message.reply(
      `\`${guildMember.displayName}\` has been ADDED to the role, \`${memberRole.name}\``
    );
  }

  if (isRoleAssignedBefore(commandName)) {
    return message.reply('User was already assigned that role.');
  }

  return message.reply('User did not have that role to being with.');
}

function isRoleAssignedBefore(commandName) {
  return commandName === 'role+';
}

module.exports.roleCheck = roleCheck;
