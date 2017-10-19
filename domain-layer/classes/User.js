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

   */
    constructor(isAdmin, firstName, lastName, address, email, phone, password) {
      this.isAdmin = isAdmin;
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = address;
      this.email = email;
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
        console.log(this.isAdmin + ' ' + this.firstName + ' ' +
         this.lastName + ' ' + this.address + ' ' + this.email + ' ' + this.phone);
    }
}

module.exports = User;
