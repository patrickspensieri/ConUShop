let ProductCatalog = require('../../domain-layer/classes/ProductCatalog');

/**
 * Class describes a user.
 * @class User
 * @export
 */
class User {
  /**
   * @constructor
   * @param {Boolean} isadmin is the user an Admin
   * @param {string} firstname first name of user
   * @param {string} lastname last name of user
   * @param {string} address home address of user
   * @param {string} email email of user
   * @param {number} phone phone number of user
   * @param {string} password user password
   * @param {string} sessionid sessionid for login session
   * @param {number} id the user id, set to null if not passed
   */
    constructor(firstname, lastname, address, email, phone, password, isadmin, sessionid, id) {
        this.isadmin = isadmin;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.sessionid = sessionid;
        this.id = id;
        this.productCatalog = ProductCatalog.getProductCatalogInstance();
    }


    /**
     * Displays information about user object.
     * To be run on an instance of user.
     * @method display
     */
    display() {
        console.log(this.isadmin + ' ' + this.firstname + ' ' +
         this.lastname + ' ' + this.address + ' ' + this.email + ' ' + this.phone + ' ' + this.sessionid);
    }

    /**
     * @param {string} productType string of the Object
     * @param {function} callback function
     * @return {Object} product catalog's inventory
     */
    getProductInventory(productType, callback) {
        return this.productCatalog.getAllProductInventory(productType, callback);
    }
}

module.exports = User;
