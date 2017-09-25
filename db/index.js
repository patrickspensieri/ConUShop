// db/index.js
// DATABASE ADAPTER FILE
// require this file instead of requiring 'pg' directly thoughout application

require('dotenv').config();

// create a new pool of clients for reading from db
const {Pool} = require('pg');

// toggle between remote and local connection
if (process.env.PG_USE_HEROKU) {
    const pool = new Pool({
        connectionString: process.env.PG_CONNECTION_STRING,
        ssl: process.env.PG_SSL,
    });
} else {
    const pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DB,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
    });
}

// export module to be used across application
module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
};
