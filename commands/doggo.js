const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'doggo',
    description: 'Random Doggo',
};

module.exports.execute = async (message) => {
    let doggo = await fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(json => json.message);

    const embed = new RichEmbed()
        .setTitle('Doggo')
        .setColor(0xFF0000)
        .setImage(doggo);

    message.channel.send(embed);

};