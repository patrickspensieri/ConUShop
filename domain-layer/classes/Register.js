let User = require('./User');
let userMapper = require('../../domain-layer/mappers/UserMapper');
let bcrypt = require('bcryptjs');

/**
 * Class describes a user.
 * @class User
 * @export
 */
class Register {
    /**
     * @constructor
     * @param {Boolean} isadmin is the user an Admin
     * @param {string} firstname first name of user
     * @param {string} lastname last name of user
     * @param {string} address home address of user
     * @param {string} email email of user
     * @param {number} phone phone number of user
     * @param {string} password user password
     * @param {function} callback function
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
