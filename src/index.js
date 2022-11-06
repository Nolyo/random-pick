const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});
const loadCommands = require('./Loaders/LoadCommands');
const loadEvents = require('./Loaders/LoadEvents');
const config = require('./botsettings.json');

bot.commands = new Discord.Collection();

bot.login(config.token);

loadCommands(bot);
loadEvents(bot);
