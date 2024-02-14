import cron from "node-cron";

export function makeEmbed(members, data) {
  const countPeople = members.length;
  /** @type {APIEmbedField[]}*/
  const ordered = [];

  for (let i = 0; i < countPeople; i++) {
    const randomIndex = randomIntFromInterval(0, members.length - 1);
    const nameMember = members[randomIndex];
    members.splice(randomIndex, 1);
    ordered.push({
      name: `Position ${i + 1}`,
      value: nameMember,
      inline: true,
    });
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

export function randomIntFromInterval(min, max) {
  if (typeof min !== "number" || typeof max !== "number") {
    return Math.floor(Math.random() * 10 + 1);
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getActivedUsers(users) {
  return users
    .filter((member) => member.activated == "true" && member.name !== undefined)
    .map((member) => member.name);
}

export async function scheduleJobs(data, webhook) {
  let i = 0;
  const jobs = data.jobs.filter((job) => job.activated == "true");
  while (i < jobs.length) {
    const job = jobs[i];
    const crontab = cron.schedule(job.cron, () => {
      const users = getActivedUsers(job.users);
      webhook.send({ embeds: [makeEmbed(users, job)] });

      console.log({
        launchedAt: new Date().toLocaleString(),
        webhook: process.env.URL_WEBHOOK,
      });
    });
    crontab.start();
    i++;
  }
}
