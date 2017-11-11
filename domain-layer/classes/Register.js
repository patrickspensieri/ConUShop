let User = require('./User');
let userMapper = require('../../domain-layer/mappers/UserMapper');
let bcrypt = require('bcryptjs');

/**
 * User Creator class
 * @class User
 * @export
 */
class Register {
    /**
     * Creates an new User and hashes the password
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} address 
     * @param {string} email 
     * @param {string} phone 
     * @param {string} password 
     * @param {boolean} isAdmin 
     * @param {*} callback 
     */
    static createNewUser(firstName, lastName, address, email, phone, password, isAdmin, callback) {
        let user = new User(firstName, lastName, address, email, phone, password, isAdmin);

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                user.password = hash;
                userMapper.makeInsertion(user);
                return callback(err, user);
            });
        });
    }
}

module.exports = Register;
