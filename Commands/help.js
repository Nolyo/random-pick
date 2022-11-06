module.exports = {
	name: 'help',
	description: 'List commands',
	permission: 'None',
	dm: true,
	async run(bot, msg) {
		const exampleEmbed = {
			color: 0x0099ff,
			title: 'List commands',
			description: 'type / for start autocomplete',
			fields: [
				{name: 'help', value: '- show list of commands'},
				{name: 'daily', value: '- set a random order for daily'},
				{name: 'ping', value: '- show ping with API discord'}
			],

			timestamp: new Date().toISOString(),
			footer: {
				text: 'and more soon',
			},
		};

		msg.reply({embeds: [exampleEmbed]});
	},
}

