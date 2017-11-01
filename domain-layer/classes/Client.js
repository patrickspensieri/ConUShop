let User = require('./User');
let ProductCatalog = require('../../domain-layer/classes/ProductCatalog');

/**
 * Class describes an Admin.
 * @class Client
 * @export
 */
class Client extends User {
    /**
     * @constructor
     * @param {string} firstName first name of user
     * @param {string} lastName last name of user
     * @param {string} address home address of user
     * @param {string} email email of user
     * @param {number} phone phone number of user
     * @param {string} password user password, hashed
     * @param {Boolean} isAdmin is the user an Admin

     */
    constructor(firstName, lastName, address, email, phone, password, isAdmin) {
        super(firstName, lastName, address, email, phone, password, isAdmin);

        this.productCatalog = new ProductCatalog();
    }

    /**
     * View items in product catalog
     * To be run on an instance of item.
     * @method display
     * @param {function} callback function
     *
     */
    getProductInventory(productType, callback) {
        let productCatalog = new ProductCatalog();
        productCatalog.getAllProductInventory(productType, callback);
    }
}
module.exports = Client;
