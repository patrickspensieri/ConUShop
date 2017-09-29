let db = require('../db');
let user = require('../domain-layer/classes/user');


var bcrypt = require('bcryptjs');
let userMapper = require('../domain-layer/mappers/userMapper');

module.exports.createUser = function(newUser){

    var bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {

            newUser.password = hash;
            userMapper.insert(newUser);

        });
    });

}

module.exports.getUserByEmail = function(email, callback){

    // To be replaced with find methods when they work.

    db.query('SELECT * FROM users', [], (err, res) => {
        if (err) {
            callback("User email not found", null);
        }
        else {
            for (let row of res.rows) {
                if ((row.email).localeCompare(email) == 0) {
                    console.log(true);
                    var foundUser = new user(row.id, row.isAdmin, row.firstName, row.lastName, row.address, row.email, row.phone, row.password);
                    callback(null, foundUser);
                }
            }
        }

    });
}

module.exports.getUserById = function(id, callback){

    db.query('SELECT * FROM users', [], (err, res) => {
        if (err) {
            callback("User Id not found", null);
        }

        for (let row of res.rows) {
            if(row.id = id) {
                var foundUser =  new user(row.id, row.isAdmin, row.firstName, row.lastName, row.address, row.email, row.phone, row.password);
                callback(null, foundUser);
            }

        }
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}