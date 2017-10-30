/**
 * Class describes a user.
 * @class User
 * @export
 */
class User {
  /**
   * @constructor
   * @param {Boolean} isAdmin is the user an Admin
   * @param {string} firstName first name of user
   * @param {string} lastName last name of user
   * @param {string} address home address of user
   * @param {string} email email of user
   * @param {number} phone phone number of user
   * @param {string} password user password
   * @param {string} sessionID sessionID for login session
   * @param {number} id the user id, set to null if not passed
   */
    constructor(isAdmin, firstName, lastName, address, email, phone, password, sessionID, id) {
        this.isAdmin = isAdmin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.sessionID = sessionID;
        this.id = id;
        // user registration always creates clients
    }


    /**
     * Displays information about user object.
     * To be run on an instance of user.
     * @method display
     */
    display() {
        console.log(this.isAdmin + ' ' + this.firstName + ' ' +
         this.lastName + ' ' + this.address + ' ' + this.email + ' ' + this.phone + ' ' + this.sessionID);
    }

    /**
     * Returns id of user.
     * @method getId
     */
    getId() {
        return this.id;
    }
}

module.exports = User;
