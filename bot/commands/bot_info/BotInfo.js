const { Client, Intents, MessageEmbed } = require('discord.js');
const fs = require('fs');

exports.Send = (interaction) => {
    
    const infoEmbed = new MessageEmbed()
    .setColor('#c62945')
    .setTitle('SiumBot V 0.0.1')
    .setURL('https://github.com/alex65ferrari/SiumBot')
    .setAuthor({ name: 'SiumBot.DoggoSium', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://github.com/alex65ferrari/SiumBot/blob/main/docs/TheFamily.md#DoggoSium' })
    .setDescription('Informazioni su questo bot:')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addField('Changelog ultima versione (V 0.0.1)', 'Yee prima versione \n - Aggiunto tutto quello che serve per iniziare.')
    .setTimestamp()
    .setFooter({ text: 'Powered by SiumBot', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    fs.readFile('./credits.json', 'utf8', (err, data) => { //Leggi il file contenente i comandi
        if(data){
            parsedCredits = JSON.parse(data); //Trasforma il file in un oggetto
        }else{
            throw err; //Se il file non è leggibile, stampa un errore ed esci.
        }

        let devCredits = []; //Array contenente i crediti sviluppatori
        for(let i = 0; i < parsedCredits.dev_credits.length; i++){ //Inserisci i comandi nell'array
            devCredits.push("Nome: " + parsedCredits.dev_credits[i].name + "\nLink: " + parsedCredits.dev_credits[i].url + "\nRuolo: " + parsedCredits.dev_credits[i].role);
        }

        let ossCredits = []; //Array contenente i crediti sviluppatori
        for(let i = 0; i < parsedCredits.oss_credits.length; i++){ //Inserisci i comandi nell'array
            ossCredits.push("Nome: " + parsedCredits.oss_credits[i].name + "\nLink: " + parsedCredits.oss_credits[i].url + "\nDescrizione: " + parsedCredits.oss_credits[i].description);
        }
    
        infoEmbed.addFields(
            { name: 'Crediti:', value: devCredits.join(" \n\n ") },
            { name: 'Crediti software open source:', value: ossCredits.join(" \n\n ") },
        )

        interaction.reply({ embeds: [infoEmbed] });
        
    });


};

