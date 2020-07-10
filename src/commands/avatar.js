module.exports = {
  name: 'avatar',
  description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
  cooldown: 5,
  execute(message) {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `Your avatar: ${message.author.displayAvatarURL}`
      );
    }

    // maps each mentioned user's avatar
    const avatarList = message.mentions.users.map((user) => {
      return `${user.username}'s avatar: ${user.displayAvatarURL}`;
    });

    message.channel.send(avatarList);
  },
};
