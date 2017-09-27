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

let getAllTelevisions = (req,res,next) => {
    client.query('SELECT * FROM television', (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
};

let getTelevision = (req, res, next) => {
    let id = parseInt(req.params.id);
    client.query(`SELECT * FROM television WHERE model=${id}`, (err, data) =>{
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
};

let getAllMonitors = (req,res,next) => {
    client.query('SELECT * FROM monitor', (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
};

let getMonitor = (req, res, next) => {
    let id = parseInt(req.params.id);
    client.query(`SELECT * FROM monitor WHERE model=${id}`, (err, data) =>{
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
};

let getAllDesktops = (req,res,next) => {
    client.query('SELECT * FROM desktop', (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
};

let getDesktop = (req, res, next) => {
    let id = parseInt(req.params.id);
    client.query(`SELECT * FROM desktop WHERE model=${id}`, (err, data) =>{
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
};

let getAllLaptops = (req,res,next) => {
    client.query('SELECT * FROM laptop', (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
};

let getLaptop = (req, res, next) => {
    let id = parseInt(req.params.id);
    client.query(`SELECT * FROM laptop WHERE model=${id}`, (err, data) =>{
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
};

let getAllTablets = (req,res,next) => {
    client.query('SELECT * FROM tablet', (err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
};

let getTablet = (req, res, next) => {
    let id = parseInt(req.params.id);
    client.query(`SELECT * FROM tablet WHERE model=${id}`, (err, data) =>{
        if (err) {
            return next(err);
        }
        res.json(data.rows);
    });
};

module.exports = {
    query: (text, params, callback) => {
        return client.query(text, params, callback);
    },
    getAllTelevisions: getAllTelevisions,
    getTelevision: getTelevision,
    getAllMonitors: getAllMonitors,
    getMonitor: getMonitor,
    getAllDesktops: getAllDesktops,
    getDesktop: getDesktop,
    getAllLaptops: getAllLaptops,
    getLaptop: getLaptop,
    getAllTablets: getAllTablets,
    getTablet: getTablet,
};
