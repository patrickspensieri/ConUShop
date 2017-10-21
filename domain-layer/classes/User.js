/**
 * Class describes a user.
 * @class User
 * @export
 */
class User {
  /**
   * @constructor
   * @param {string} email email of user
   * @param {Boolean} isAdmin is the user an Admin
   * @param {string} firstName first name of user
   * @param {string} lastName last name of user
   * @param {string} address home address of user
   * @param {number} phone phone number of user
   * @param {string} password user password

   */
    constructor(email, isAdmin, firstName, lastName, address, phone, password) {
      this.email = email;
      this.isAdmin = isAdmin;
      this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.password = password;
        // user registration always creates clients
    }


    /**
     * Displays information about user object.
     * To be run on an instance of user.
     * @method display
     */
    display() {
        console.log(this.email + ' ' + this.isAdmin + ' ' + this.firstName + ' ' +
         this.lastName + ' ' + this.address + ' ' + this.phone);
    }

}

module.exports = User;
