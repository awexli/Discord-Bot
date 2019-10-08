require('dotenv').config()


const fs = require('fs')
const Discord = require('discord.js')

const client = new Discord.Client();

client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

const PREFIX = "p-";

// set every js file in the commands folder into a string array
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// set the name: object in each command module to be the official commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setPresence({
        status: "online",
        game: {
            name: "myself being developed",
            type: "WATCHING"
        }
    });
});

client.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    // p-vid haiku
    // ['vid', 'haiku']
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    // command officially stored
    const command = client.commands.get(commandName);

    // checks for any command module using args: object
    console.log(command.args + args.length)
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);

    // gets the necessary cooldown amount in the command file with default of 3 seconds
    const cooldownAmount = (command.cooldown || 3) * 1000;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});


client.login(process.env.BOT_TOKEN)
