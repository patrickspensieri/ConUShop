let Computer = require('./User');

/**
 * Class describes an Admin.
 * @class Admin
 * @export
 */
class Admin extends User {
    /**
     * @constructor
     * @param {string} firstName first name of user
     * @param {string} lastName last name of user
     * @param {string} address home address of user
     * @param {string} email email of user
     * @param {number} phone phone number of user
     * @param {string} id the id of user
     * @param {string} password user password, hashed
     */
    constructor(firstName, lastName, address, email, phone, password, isAdmin) {
        super(firstName, lastName, address, email, phone, password, isAdmin);
    }
}

module.exports = Admin;
