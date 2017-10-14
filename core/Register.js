let User = require('./User');
let userMapper = require('../mapping/userMapper');
let bcrypt = require('bcryptjs');

/**
 * Class describes a user.
 * @class User
 * @export
 */
class Register {

    static createNewUser(firstName, lastName, address, email, phone, password, isAdmin, callback) {

        let user = new User(firstName, lastName, address, email, phone, password, isAdmin)

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                user.password = hash;
                userMapper.insert(user);
                return callback(err, user);
            });
        });
    }
}

module.exports = Register;
