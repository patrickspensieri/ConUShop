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
   * @param {string} session_id session_id for login session
   * @param {number} id the user id, set to null if not passed
   */
    constructor(isAdmin, firstName, lastName, address, email, phone, password, session_id, id) {
        this.isAdmin = isAdmin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.session_id = session_id;
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
         this.lastName + ' ' + this.address + ' ' + this.email + ' ' + this.phone + ' ' + this.session_id);
    }
}

module.exports = User;
