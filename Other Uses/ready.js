module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setPresence({
        status: "online",
        game: {
            name: "myself being developed",
            type: "WATCHING"
        }
    });
}