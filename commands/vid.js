const Discord = require('discord.js');
const fs = require("fs");

var haikuText = fs.readFileSync("./youtube.txt", "utf-8");
var songText = fs.readFileSync("./song.txt", "utf-8");

module.exports = {
    name: 'vid',
    description: 'Returns a random youtube video.',

    execute(message, args) {
        const embed = new Discord.RichEmbed()
            .setTitle('p-vid <command>')
            .setColor(0xFF0000)
            .addField('p-vid haiku', 'Links to a random video I like')
            .addField('p-vid song', 'Links to a random song I like');

        if (!args.length || args.length > 1) {
            return message.reply(embed);
        }

        const type = args[0];

        if (type == 'haiku') {
            var textByLine = haikuText.split("\n");
        } else if (type == 'song') {
            console.log("Songs:");
            var textByLine = songText.split("\n");
            console.log(textByLine);
        } else {
            return message.reply(embed);
        }
        
        var index = Math.floor(Math.random() * textByLine.length);
        console.log('index: ' + index);
        var html = 'https://youtu.be/' + textByLine[index];
        message.channel.send(html);
    },
};