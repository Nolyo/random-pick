const Discord = require('discord.js');
const client = new Discord.Client();
const botSettings = require("./botsettings.json");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const message = msg.content.split(' ');
    if (!message.length) return;
    const commandName = message.shift();
    if (commandName === '/daily') {
        const countPeople = message.length;
        const ordered = [];
        
        for (let i = 0; i < countPeople; i++) {
            const randomIndex = Math.floor(Math.random() * message.length);
            const item = message[randomIndex];
            message.splice(randomIndex, 1);
            ordered.push(item);
            console.log(randomIndex);
        }


        msg.reply(`Order for the daily (${countPeople} persons: ${ordered.join(', ')}`);
    }
});

client.login(botSettings.token);

