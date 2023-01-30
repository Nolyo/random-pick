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
		title: 'Join meet',
		url: 'https://meet.google.com/voh-sbqp-kcz',
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
		const welcomeEmbed = {
			"type": "rich",
			"title": `Bot daily alert`,
			"description": `Hello @tech, I am a hook that will notify you every day of the week to give you the order for the daily\nI'll come by to say hello in the morning at 11:55 a.m. (Paris time)`,
			"color": 0x00FFFF
		}
		await webhook.send({embeds: [welcomeEmbed]});
		// 55 11 * * Mon-Fri || * * * * *
		await cron.schedule('55 11 * * Mon-Fri', () => {
			webhook.send({embeds: [makeEmbed(['William', 'Yohann'])]});
		});
	} catch (e) {
		console.error(e);
	}
})