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
     * @param {Boolean} isAdmin is the user an Admin
     * @param {string} firstName first name of user
     * @param {string} lastName last name of user
     * @param {string} address home address of user
     * @param {string} email email of user
     * @param {number} phone phone number of user
     * @param {string} password user password
     * @param {function} callback function
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
