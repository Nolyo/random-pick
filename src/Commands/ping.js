module.exports = {
	name: 'ping',
	description: 'Show ping with api',
	permission: 'None',
	dm: true,
	async run(bot, msg) {
		await msg.reply(`Ping: \`${bot.ws.ping}\``)
	},
}