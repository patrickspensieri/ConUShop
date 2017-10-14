/**
 * Class describes a user.
 * @class User
 * @export
 */
class User {
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
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.password = password;
        // user registration always creates clients
        this.isAdmin = isAdmin;
    }


    /**
     * Displays information about user object.
     * To be run on an instance of user.
     * @method display
     */
    display() {
        console.log(this.isAdmin + ' ' + this.firstName + ' ' +
         this.lastName + ' ' + this.address + ' ' + this.email + ' ' + this.phone);
    }
}

module.exports = User;
