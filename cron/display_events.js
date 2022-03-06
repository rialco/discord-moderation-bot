import client from '../index.js';
import { getEvents } from '../repos/events.js';

const guild = await client.guilds.fetch('417135020696928257');

const channels = await guild.channels.fetch();
const eventsChannelMap = channels.filter((channel => channel.type === "GUILD_TEXT" && channel.name === "bots"));

const eventsChannel = [...eventsChannelMap][0][1];

const events = await getEvents();

const exampleEmbed = {
	color: 0x0099ff,
	title: 'Upcoming events',
    description: "Today's and tomorrow's events",
	author: {
		name: 'Event calendar',
		icon_url: 'https://i.imgur.com/kRVcQYP.jpg',
		url: 'https://discord.js.org',
	},
	thumbnail: {
		url: 'https://i.imgur.com/kRVcQYP.jpg',
	},
	fields: [],
	timestamp: new Date(),
	footer: {
		text: 'with love from papi ricky',
		icon_url: 'https://i.imgur.com/kRVcQYP.jpg',
	},
};

events.map((event) => {
	console.log(event);
    const nField = { name: ':soccer: ' + event.name, value: event.date.toLocaleDateString() };
    exampleEmbed.fields.push(nField);
    eventsChannel.send({ embeds: [exampleEmbed] });
});


