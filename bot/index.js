const { Client, Intents, MessageEmbed } = require('discord.js');
const fs = require('fs');
const { token } = require('./bot_config.json');
const SlashManager = require('./SlashManager.js');
const BotInfo = require('./commands/bot_info/BotInfo.js');

// Nuovo client di discord
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Quando il client è pronto
client.once('ready', () => {
	console.log('SiumBot è pronto!');
    
});

//Ricevi i comandi
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'info') {
		BotInfo.Send(interaction);
	}

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

// Login to Discord with your client's token
client.login(token);