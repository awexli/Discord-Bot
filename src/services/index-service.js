const Discord = require('discord.js');
const cooldownMap = new Discord.Collection();

module.exports = {
  NoArgumentMessage(message, command) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    return command.hasUsage
      ? message.reply(command.usage())
      : message.channel.send(reply);
  },
  CheckCooldown(message, command) {
    if (!cooldownMap.has(command.name)) {
      cooldownMap.set(command.name, new Discord.Collection());
    }
   
    const now = Date.now();
    const timestamps = cooldownMap.get(command.name);
    const cooldownPeriod = (command.cooldown || 3) * 1000;

    // runs once a user has executed a command AGAIN
    // within the cooldown period
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownPeriod;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return timeLeft.toFixed(1);
      }
    }

    // user executed a command
    timestamps.set(message.author.id, now);

    // apply cooldown period
    setTimeout(() => {
      timestamps.delete(message.author.id);
    }, cooldownPeriod);
  },
};
