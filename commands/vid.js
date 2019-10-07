module.exports = message => {
    var fs = require("fs");
    var text = fs.readFileSync("./youtube.txt", "utf-8");
    var textByLine = text.split("\n")

    var index = Math.floor(Math.random() * textByLine.length);
    var html = 'https://youtu.be/' + textByLine[index];
    message.channel.send(html);
}