function makeEmbed(members, data) {
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
		color: parseInt(data.classicMessage.color, 16),
		title: data.classicMessage.title,
		url: data.classicMessage.url,
		description: data.classicMessage.description,
		thumbnail: data.classicMessage.thumbnail,
		fields: ordered,

		timestamp: new Date().toISOString(),
		footer: data.classicMessage.footer,
	};

	return exampleEmbed;
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function getActivedUsers(users) {
    return users.filter(member => member.activated == 'true').map(member => member.name);
}

module.exports = {
    makeEmbed,
    randomIntFromInterval,
    getActivedUsers
};