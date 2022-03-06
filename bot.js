import { muteUser } from './commands/mute.js';
import { addEvent } from './commands/event_add.js';
import { removeEvent } from './commands/event_remove.js';
import client from './index.js';

client.once('ready', async () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
    if(msg.channel.name !== 'wmd') return;
    if(msg.author.bot) return;

    const cmdPreposition = msg.content.slice(0,2);
    if (cmdPreposition != 'w.') return;

    const cmdString = msg.content.slice(2,);
    const cmdParams = cmdString.split(" ");

    const cmd = cmdParams[0];
    switch(cmd) {
        case 'mute':
            const user = cmdParams[1];
            const timeFrame = cmdParams[2];
            const guild = client.guilds.cache.get(msg.guildId);
            muteUser(user.toLowerCase(), timeFrame, guild, msg);
            break;
        case 'event':
            const modality = cmdParams[1];
            const eventName = cmdParams[2];
            const eventType = cmdParams[3];
            const eventDate = cmdParams[4];
            if(modality === 'add') addEvent(eventName, eventType, eventDate);
            if(modality === 'remove') removeEvent(eventName, eventDate);
            break;
        default:
            console.log('patin');
            break;
    }
});