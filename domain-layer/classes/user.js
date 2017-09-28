/**
 * Class describes a user.
 * @class user
 * @export
 */
class user {
  /**
   * @constructor
   * @param {string} id the id of user
   * @param {string} firstName first name of user
   * @param {string} lastName last name of user
   * @param {string} address home address of user
   * @param {string} email email of user
   * @param {number} phone phone number of user
   */
    constructor(firstName, lastName, address, email, phone, id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.isAdmin = false;
    }

    /**
     * Displays information about user object.
     * To be run on an instance of user.
     * @method display
     */
    display() {
        console.log(this.id + ' ' + this.isAdmin + ' ' + this.firstName + ' ' + this.lastName + ' ' + this.address + ' ' + this.email + ' ' + this.phone);
    }
}

module.exports = user;
