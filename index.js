// Require the necessary discord.js classes
import { Client, Intents} from 'discord.js';
import pool from './pool.js';
import dotenv from 'dotenv';

dotenv.config();

// Create a new client instance
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,  
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_MESSAGES
    ] 
});

const connectionString = process.env.DATABASE_URL;
const newConString = connectionString + '?sslmode=no-verify';

const devConfig = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: '',
    max: 20,
    port: process.env.PGPORT
}

const prodConfig = {
    newConString,
    ssl: { require: true, rejectUnathorized: false},
}

const config = process.env.PRODUCTION == 'false' ? devConfig : prodConfig;

console.log(config);

pool.connect(config)
.then(async () => {
    // Login to Discord with your client's token
    client.login(process.env.DISCORD_TOKEN);
}).catch((err) => {
    console.log(err);
})

export default client;