let User = require('./User');
let ProductCatalog = require('../../domain-layer/classes/ProductCatalog');
let ShoppingCart = require('../../domain-layer/classes/ShoppingCart');

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
    constructor(firstName, lastName, address, email, phone, password, isAdmin, sessionID, id) {
        super(firstName, lastName, address, email, phone, password, isAdmin, sessionID, id);
        this.productCatalog = ProductCatalog.getProductCatalogInstance();
        this.shoppingcart = new ShoppingCart(this.productCatalog, this);
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
module.exports = Client;
