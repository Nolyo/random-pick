const loadSlashCommands = require('../Loaders/LoadSlashCommands');
const config = require('../botsettings.json');

module.exports = async (bot, msg) => {
	await loadSlashCommands(bot);
	bot.user.setActivity(`type ${config.prefix}help`);
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