require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const responsesFile = 'responses.json';

// Create a new client instance with intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Read the response JSON file
const responseJSON = JSON.parse(fs.readFileSync(responsesFile, 'utf8'));

// Event listener when the client is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Message event listener
client.on('messageCreate', message => {
  if (!message.guild) return; // Ignore bot messages and any DMs

  const content = message.content.toLowerCase();
  if (content == ".urge") {
    const responses = responseJSON.responses;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const personalizedResponse = randomResponse.replace(/\$\{message\.author\}/g, `<@${message.author.id}>`);
    message.channel.send(personalizedResponse);
  }
});

// Log in to Discord with your client's token
client.login(process.env.CLIENT_TOKEN);
