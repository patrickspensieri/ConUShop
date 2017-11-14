let User = require('./User');
let ProductCatalog = require('../../domain-layer/classes/ProductCatalog');
let UserMapper = require('../../domain-layer/mappers/UserMapper');

/**
 * Class describes an Admin.
 * @class Admin
 * @export
 */
class Admin extends User {
    /**
     * Creates an admin class
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} address 
     * @param {string} email 
     * @param {string} phone 
     * @param {string} password 
     * @param {boolean} isadmin 
     * @param {string} sessionid 
     * @param {string} id 
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
