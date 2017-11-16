let ProductCatalog = require('./ProductCatalog');

/**
 * Class describes a user.
 * @class User
 * @export
 */
class User {
    /**
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} address 
     * @param {string} email 
     * @param {string} phone 
     * @param {string} password 
     * @param {boolean} isadmin 
     * @param {string} session_id 
     * @param {string} id 
     */
    constructor(firstname, lastname, address, email, phone, password, isadmin, session_id, id) {
        this.isadmin = isadmin;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.session_id = session_id;
        this.id = id;
        this.productCatalog = ProductCatalog.getProductCatalogInstance();
    }

    /**
     * Get the product catalog inventory
     * @param {string} productType string of the Object
     * @param {function} callback function
     * @return {Object} product catalog's inventory
     */
    getProductInventory(productType, callback) {
        return this.productCatalog.getAllProductInventory(productType, callback);
    }
}

module.exports = User;
