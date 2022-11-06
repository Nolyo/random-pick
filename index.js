const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});

const {WebhookClient} = require("discord.js");
const cron = require("node-cron");
require('dotenv').config();

bot.login(process.env.TOKEN_WEBHOOK);

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function makeEmbed(members) {
	const countPeople = members.length;
	/** @type {APIEmbedField[]}*/
	const ordered = [];

	for (let i = 0; i < countPeople; i++) {
		const randomIndex = randomIntFromInterval(0, members.length - 1);
		const nameMember = members[randomIndex];
		members.splice(randomIndex, 1);
		ordered.push({name: `Position ${i + 1}`, value: nameMember, inline: true});
	}

	const exampleEmbed = {
		color: 0x0099ff,
		title: 'Daily Order',
		url: 'https://meet.google.com/voh-sbqp-kcz',
		author: {
			name: 'Daily Bot',
			url: 'https://meet.google.com/voh-sbqp-kcz',
		},
		description: 'The daily will be start',
		thumbnail: {
			url: 'https://i.imgur.com/qS99IiV.png',
		},
		fields: ordered,

		timestamp: new Date().toISOString(),
		footer: {
			text: 'See you soon !',
		},
	};

	return exampleEmbed;
}

bot.on('ready', async () => {
	console.log(`${bot.user.tag} is online`);
	console.log(`Server time : ${new Date().toLocaleString()}`);
	try {
		const webhook = new WebhookClient({
			url: process.env.URL_WEBHOOK
		});

		// 55 11 * * Mon-Fri || * * * * *
		await cron.schedule('55 11 * * Mon-Fri', () => {
			webhook.send({embeds: [makeEmbed(['Hugo', 'William', 'Yohann'])]});
		});
	} catch (e) {
		console.error(e);
	}
})