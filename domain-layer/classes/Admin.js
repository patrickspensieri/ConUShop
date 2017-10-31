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
     * @param {string} firstName first name of user
     * @param {string} lastName last name of user
     * @param {string} address home address of user
     * @param {string} email email of user
     * @param {number} phone phone number of user
     * @param {string} password user password, hashed
     * @param {Boolean} isAdmin is the user an Admin
     *
     */
    constructor(firstName, lastName, address, email, phone, password, isAdmin) {
        super(firstName, lastName, address, email, phone, password, isAdmin);

        this.productCatalog = ProductCatalog.getProductCatalogInstance();
    }

    /**
     * Method to access ProductCatalog instances
     * @method display
     * @return {ProductCatalog} ProductCatalog instance
     */
    getProductCatalogInstance() {
        return this.productCatalog;
    }
}

module.exports = Admin;
