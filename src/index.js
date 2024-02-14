import dotenv from "dotenv";
import Discord, { WebhookClient, Events } from "discord.js";
import { scheduleJobs } from "./utils.js";
import * as data from "./config.json" assert { type: "json" };

const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({ intents });

dotenv.config();

bot.login(process.env.TOKEN_WEBHOOK);

bot.once(Events.ClientReady, async (readyClient) => {
  console.log(`${readyClient.user.tag} is online`);
  console.log(`Server time : ${new Date().toLocaleString()}`);

  try {
    const webhook = new WebhookClient({
      url: process.env.URL_WEBHOOK,
    });

    const welcomeEmbed = {
      type: data.default.welcomeMessage.type,
      title: data.default.welcomeMessage.title,
      description: data.default.welcomeMessage.description,
      color: parseInt(data.default.welcomeMessage.color, 16),
    };

    await webhook.send({ embeds: [welcomeEmbed] });

    scheduleJobs(data.default, webhook);
  } catch (e) {
    console.error(e);
  }
});
