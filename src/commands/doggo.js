const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'doggo',
  description: 'Random Doggo',
};

module.exports.execute = async (message, args) => {
  let defaultQuery = `breed/${args[0]}/images`;

  if (!args.length) {
    defaultQuery = 'breeds/image';
  }

  if (args.length > 1) {
    return message.reply(
      '`p-doggo` for a random doggo, or `p-doggo <breed>` for a specific breed.'
    );
  }

  console.log(defaultQuery);

  let doggo = await fetch(`https://dog.ceo/api/${defaultQuery}/random`)
    .then((response) => response.json())
    .then((json) => json.message);

  const embedDoggo = new RichEmbed()
    .setTitle('YOUR DOGGO')
    .setColor(0xff0000)
    .setImage(doggo);

  message.channel.send(embedDoggo).catch((err) => {
    console.log(err);
    message.reply(doggo);
  });
};
