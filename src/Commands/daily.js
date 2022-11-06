module.exports = {
	name: 'daily',
	description: 'Running order for the daily',
	permission: 'None',
	dm: false,
	options: [{
		type: 'string',
		name: 'members',
		description: "Who talk ? default: Hugo William Yohann",
		required: false
	}],
	makeEmbed: function (members) {
		const countPeople = members.length;
		/** @type {APIEmbedField[]}*/
		const ordered = [];

		for (let i = 0; i < countPeople; i++) {
			const randomIndex = this.randomIntFromInterval(0, members.length - 1);
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
	},
	randomIntFromInterval: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	},
	async run(bot, msg, args) {
		let members = ['Hugo', 'William', 'Yohann'];

		if (args.get('members')) {
			members = args.get('members').value.split(' ');
		}

		if (!members.length) msg.reply(`Members not found`);

		const exampleEmbed = this.makeEmbed(members);

		msg.reply({embeds: [exampleEmbed]})
	},
}

