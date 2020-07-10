const Discord = require('discord.js');
const fs = require('fs');

const haikuText = fs.readFileSync('./src/haiku.txt', 'utf-8');
const songText = fs.readFileSync('./src/song.txt', 'utf-8');

module.exports = {
  name: 'vid',
  description: 'Returns a random youtube video.',
  args: true,
  hasUsage: true,
  execute(message, args) {
    const type = args[0];
    const youtubeLinks = this.getVideoType(type);

    if (!youtubeLinks) {
      return message.reply(embed);
    }

    const index = this.getRandomIndexInclusive(0, youtubeLinks.length - 1);
    const randomLink = youtubeLinks[index];

    message.channel.send(randomLink);
  },
  getVideoType(type) {
    if (type === 'haiku') {
      return haikuText.split('\n');
    }

    if (type === 'song') {
      return songText.split('\n');
    }
  },
  getRandomIndexInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  usage() {
    return new Discord.RichEmbed()
      .setTitle('p-vid <command>')
      .setColor(0xff0000)
      .addField('p-vid haiku', 'Links to a random video I like')
      .addField('p-vid song', 'Links to a random song I like');
  },
};
