var { Client } = require('pg');
var client = new Client({
    connectionString : "postgres://kkpbujauwlnekb:8c221de6a032ef270df3d9c1048336529f38477b7adbddade13a3c6d22d52f27@ec2-54-243-255-57.compute-1.amazonaws.com:5432/d3n2v1itic5914",
    ssl: true
})

module.exports = client;