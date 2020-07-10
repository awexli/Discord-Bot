const Discord = require('discord.js');
const cooldowns = new Discord.Collection();

module.exports = {
  NoArgumentMessage(message, command) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    return command.hasUsage
      ? message.reply(command.usage())
      : message.channel.send(reply);
  },
  IsCooldownPeriod(message, command) {
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    // runs once a user has executed a command AGAIN
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const seconds = timeLeft.toFixed(1);
        return message.reply(
          `please wait ${seconds} more second(s) before using the \`${command.name}\` command.`
        );
      }
    }

    // user executed a command
    timestamps.set(message.author.id, now);
    // user has not executed a command AGAIN during the cooldown period
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  },
};
