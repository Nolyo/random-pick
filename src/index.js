const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});
const {WebhookClient, Events} = require("discord.js");
const cron = require("node-cron");
const utils = require('./utils')
bot.commands = new Discord.Collection();

require('dotenv').config();

bot.login(process.env.TOKEN_WEBHOOK);

bot.once(Events.ClientReady, async (readyClient ) => {
	const data = require('./config.json');
	console.log(`${readyClient .user.tag} is online`);
	console.log(`Server time : ${new Date().toLocaleString()}`);

	try {
		const webhook = new WebhookClient({
			url: process.env.URL_WEBHOOK
		});
		
		const welcomeEmbed = {
			"type": data.welcomeMessage.type,
			"title": data.welcomeMessage.title,
			"description": data.welcomeMessage.description,
			"color": parseInt(data.welcomeMessage.color, 16),
		}

		await webhook.send({embeds: [welcomeEmbed]});

		// 55 11 * * Mon-Fri || * * * * *
		await cron.schedule(data.cron || "* * * * *", () => {
			const users = utils.getActivedUsers(data.users);
			webhook.send({embeds: [utils.makeEmbed(users, data)]});

			console.log({
				launchedAt: new Date().toLocaleString(),
				webhook: process.env.URL_WEBHOOK,
			});
		});

	} catch (e) {
		console.error(e);
	}
})
