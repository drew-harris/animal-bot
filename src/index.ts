import { Client, Events, GatewayIntentBits, Message } from "discord.js";
require("dotenv/config"); // Load environment variables
import { startServer } from "./fastify";
import { handleCommand } from "./command/handler";
console.log(process.env.TOKEN);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Animal emojis for reactions
const animalEmojis = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
  "🐧",
  "🐦",
  "🦆",
  "🦅",
  "🦉",
  "🦇",
  "🐺",
  "🐗",
  "🐴",
  "🦄",
  "🐝",
  "🐛",
  "🦋",
  "🐌",
];

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.isChatInputCommand()) {
    handleCommand(interaction);
  }
});

client.on(Events.MessageCreate, async (message: Message) => {
  if (message.content.toLowerCase() === "animals") {
    // Get reference to the message being replied to
    const repliedTo = message.reference
      ? await message.channel.messages.fetch(message.reference.messageId!)
      : null;

    if (repliedTo) {
      // Shuffle and take 20 random emojis
      const shuffled = [...animalEmojis]
        .sort(() => Math.random() - 0.5)
        .slice(0, 20);

      // Add reactions
      for (const emoji of shuffled) {
        try {
          repliedTo.react(emoji);
        } catch (error) {
          console.error("Error adding reaction:", error);
        }
      }
    }
  }
});

const token = process.env.REAL_TOKEN;

if (!token) {
  console.error("No token provided!");
  process.exit(1);
}

client.login(token);

// Start the remotion bundler

startServer();

export { client };
