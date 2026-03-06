const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

const client = new Discord.Client();
const prefix = '!';  // You can change the prefix to whatever you want

client.once('ready', () => {
    console.log('Bot is online!');
});

// Load commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (command) {
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error executing that command!');
        }
    }
});

client.login('YOUR_BOT_TOKEN'); // Make sure to replace 'YOUR_BOT_TOKEN' with your actual bot token
