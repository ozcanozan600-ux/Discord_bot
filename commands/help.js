// Help Command for Discord Bot

module.exports = {
    name: 'help',
    description: 'Displays all available commands',
    execute(message) {
        const commands = [
            { name: 'ping', description: 'Replies with Pong!' },
            { name: 'beep', description: 'Replies with Boop!' },
            // Add more commands here
        ];
        const commandList = commands.map(cmd => `!${cmd.name}: ${cmd.description}`).join('\n');
        message.channel.send(`**Available Commands:**\n${commandList}`);
    },
};
