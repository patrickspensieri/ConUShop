let User = require('./User');
let ProductCatalog = require('../../domain-layer/classes/ProductCatalog');

/**
 * Class describes an Admin.
 * @class Admin
 * @export
 */
class Admin extends User {
    /**
     * @constructor
     * @param {string} firstname first name of user
     * @param {string} lastname last name of user
     * @param {string} address home address of user
     * @param {string} email email of user
     * @param {number} phone phone number of user
     * @param {string} password user password, hashed
     * @param {Boolean} isadmin is the user an Admin
     */
    constructor(firstname, lastname, address, email, phone, password, isadmin, sessionid, id) {
        super(firstname, lastname, address, email, phone, password, isadmin, sessionid, id);

        this.productCatalog = ProductCatalog.getProductCatalogInstance();
    }

    /**
     * Product catalog accessor method
     * @method display
     * @return {ProductCatalog} ProductCatalog instance
     */
    getProductCatalog() {
        return this.productCatalog;
    }
}

module.exports = Admin;
