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
     * User creator class
     * @param {*} firstname 
     * @param {*} lastname 
     * @param {*} address 
     * @param {*} email 
     * @param {*} phone 
     * @param {*} password 
     * @param {*} isadmin 
     * @param {*} callback 
     */
    static createNewUser(firstname, lastname, address, email, phone, password, isadmin, callback) {
        let user = new User(firstname, lastname, address, email, phone, password, isadmin);

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
