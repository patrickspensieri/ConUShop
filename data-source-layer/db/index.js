// db/index.js
// DATABASE ADAPTER FILE
// require this file instead of requiring 'pg' directly thoughout application

require('dotenv').config();

// create a new pool of clients for reading from db
const {Client} = require('pg');

// process.env.KEY values are stored in your private .env file
let client = null;
if (process.env.PG_USE_HEROKU) {
    client = new Client({
        connectionString: process.env.PG_CONNECTION_STRING,
        ssl: process.env.PG_SSL,
    });
} else {
    client = new Client({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DB,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
    });
}
client.connect();

module.exports = {
    query: (text, params, callback) => {
        return client.query(text, params, callback);
    },
};

module.exports = client;
