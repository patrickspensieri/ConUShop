// db/index.js
// DATABASE ADAPTER FILE
// require this file instead of requiring 'pg' directly thoughout application

// set connectionString if needed

const {Pool} = require('pg');
// create a new pool of clients
const pool = new Pool({
    user: 'patrickspensieri',
    host: 'localhost',
    database: 'local_heroku1',
    password: '',
    port: 5432,}
);

// export module to be used across application
module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
}

// let {Client} = require('pg');
// let client = new Client({
//     connectionString: 'postgres://kkpbujauwlnekb:8c221de6a032ef270df3d9c1048336529f38477b7adbddade13a3c6d22d52f27@ec2-54-243-255-57.compute-1.amazonaws.com:5432/d3n2v1itic5914',
//     ssl: true,
// });
