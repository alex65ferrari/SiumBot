const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const fs = require('fs');
const { client_id, guild_id, token } = require('./bot_config.json');

/*
File: SlashManager.js
Spiegazione: Script che gestisce gli slash commands.

I comandi vengono presi dal file slash_commands.json che contiene anche l'id del server (guild) a cui i comandi vengono inviati.
Il bot non invia i comandi a tutti i server ma solo ad uno specifico perché i comandi globali (non collegati ad un server) sono più lenti nel propagarsi.

*/


fs.readFile('./slash_commands.json', 'utf8', (err, data) => { //Leggi il file contenente i comandi
	if(data){
        parsedCommands = JSON.parse(data); //Trasforma il file in un oggetto
	}else{
        throw err; //Se il file non è leggibile, stampa un errore ed esci.
	}

    let commands = []; //Array contenente i comandi

    for(let i = 0; i < parsedCommands.command.length; i++){ //Inserisci i comandi nell'array
        commands.push(new SlashCommandBuilder().setName(parsedCommands.command[i].name).setDescription(parsedCommands.command[i].description));
        console.log("Slash Command registrato: (", i + 1, "/", parsedCommands.command.length, ") -- Nome: ", parsedCommands.command[i].name, " Descrizione: ", parsedCommands.command[i].description);
    }

    //Crea un oggetto contenente i comandi e invia i comandi a discord

    commands.map(command => command.toJSON());

    const rest = new REST({ version: '9' }).setToken(token);

    rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands })
        .then(() => console.log('Gli slash commands sono stati inviati ai seguenti server (id): ' + guild_id + '.'))
        .catch(console.error);
});