const loadSlashCommands = require('../Loaders/LoadSlashCommands');
const config = require('../botsettings.json');
const cron = require('node-cron');
const {WebhookClient} = require("discord.js");
const daily = require('../Commands/daily');

module.exports = async (bot) => {
	await loadSlashCommands(bot);
	bot.user.setActivity(`type ${config.prefix}help`);
	try {
		const webhook = new WebhookClient({
			// url: 'https://discord.com/api/webhooks/1038780376736354314/RKeXtOU-n4UlxIBq0OvpqQxVMLrDcOyNbRrU6A6as-qChUlZNtcBo24r5uI3k2uSrJOg'
			url: 'https://discord.com/api/webhooks/1038782014700138510/Vug3HsLrQ9n9cNzgkm03Rrfmggacq_EXynUCT_nF1esLQun8nIJW44SSZgdTxuIFthkY'
		});

		await cron.schedule('55 11 * * Mon-Fri', () => {
			const exampleEmbed = daily.makeEmbed(['Hugo', 'William', 'Yohann'])
			webhook.send({embeds: [exampleEmbed]});
		});
	} catch (e) {
		console.error(e);
	}

	//TODO: fix this bellow
	/*bot.user.setPresence({
		status: 'online',
		activity: {
			name: '/daily',
			type: 'WAITING'
		}
	});*/
	console.log(`${bot.user.tag} is online`);
}