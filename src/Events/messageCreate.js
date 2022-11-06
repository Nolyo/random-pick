const config = require('../botsettings.json');

module.exports = async (bot, msg) => {
	let prefix = config.prefix;
	let messageArray = msg.content.split(' ');
	let commandName = messageArray.shift().slice(prefix.length);

	if (!msg.content.startsWith(prefix)) return;

	let command = require(`../Commands/${commandName}`);
	if (!command) return msg.reply(`Command ${commandName} not found`);

	command.run(bot, msg, messageArray);
}