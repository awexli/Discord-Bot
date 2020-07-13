require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = 'p-';
const IndexService = require('./src/services/index-service');

client.commands = new Discord.Collection();

// set every js file in the commands folder into a string array
const commandFiles = fs
  .readdirSync('./src/commands')
  .filter((file) => file.endsWith('.js'));

// set the name: object in each command module to be the official commands
for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: 'online',
    game: {
      name: 'myself being developed',
      type: 'WATCHING',
    },
  });
});

client.on('guildMemberAdd', (member) => {
  console.log(`User ${member.user.tag} has joined the server!`);
  const role = member.guild.roles.find((role) => role.name == 'User');
  member.addRole(role);
});

client.on('message', (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  // p-vid haiku
  // args = ['haiku']
  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) {
    return;
  }

  // command officially stored
  const command = client.commands.get(commandName);

  // checks for any command module using args: object
  if (command.args && !args.length) {
    return IndexService.NoArgumentMessage(message, command);
  }

  const cooldown = IndexService.CheckCooldown(message, command);

  if (cooldown) {
    return message.reply(
      `please wait ${cooldown} more second(s) before using the \`${command.name}\` command.`
    );
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(process.env.BOT_TOKEN);
