<<<<<<< HEAD
require('dotenv').config()

const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

// read all files of the events folder
fs.readdir('./events/', (err, files) => { // arg files = array of filenames in directory
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`) // require each event handler using the FILENAME
        const eventName = file.split('.')[0] // remove .js extension from the FILENAME
        client.on(eventName, (...args) => eventHandler(client, ...args))
    })
})

client.login(process.env.BOT_TOKEN)
=======
const {Client, RichEmbed} = require('discord.js');
const client = new Client();

const token = ' ';

const PREFIX = '!';

client.on('ready', () => {
    console.log('Bot is online!');
})

client.on('message', msg=> {
    
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch (args[0]){
        case 'avatar':

            msg.reply(msg.author.avatarURL);

            break;

        case 'vid':
            
            var fs = require("fs");
            var text = fs.readFileSync("./youtube.txt", "utf-8");
            var textByLine = text.split("\n")

            var index = Math.floor(Math.random() * textByLine.length);
            var html = 'https://youtu.be/' + textByLine[index];
            msg.channel.send(html);

            break;

        case 'help':

            const embed = new RichEmbed()
            .setTitle('Commands')
            .setColor(0xFF0000)
            .addField('!vid', 'Links to a random video')
            .addField('!clear <number>', 'Clears the specified number of chat messages')
            .addField('!avatar', 'Links the users avatar');

            msg.channel.send(embed);

            break;

        case 'clear':

            if (!args[1]) return msg.reply('Define how many messages you want to clear.')
            msg.channel.bulkDelete(args[1]);

            break;
    }
})

client.login(token)
>>>>>>> 0a5ce033f5f53b2d6c57ef11b7de69b3447a3349
