const { default: axios } = require('axios');
const tmi = require('tmi.js');

require("dotenv").config();

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN,

    },
    channels: ['Siddharth666__']
})

client.connect();

client.on('message', async (channel, tags, message, self) => {
    if (self) return;

    console.log(channel);
    console.log(tags);
    console.log(message);

    await axios.get("http://localhost:5000/api/watson/session");

    const responseMessage = await axios.post("http://localhost:5000/api/chat/message", { message: message });
    client.say(channel, `@${tags.username} ${responseMessage.data.message.output.generic[0].text}`)
});