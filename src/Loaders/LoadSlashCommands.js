const Discord = require('discord.js');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord.js');

module.exports = async bot => {
	const commands = [];

	bot.commands.forEach(command => {
		let slashCommands = new Discord.SlashCommandBuilder()
			.setName(command.name)
			.setDescription(command.description)
			.setDMPermission(command.dm)
			.setDefaultMemberPermissions(command.permission === "None" ? null : command.permission);

		if (command.options?.length) {
			for (let i = 0; i < command.options.length; i++) {
				slashCommands[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required))
			}
		}
		commands.push(slashCommands)
	});

	const rest = new REST({version: '10'}).setToken(bot.token);
	await rest.put(Routes.applicationCommands(bot.user.id), {body: commands});
	console.log(`SlashCommands created`);
}