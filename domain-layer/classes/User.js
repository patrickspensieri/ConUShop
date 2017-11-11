let ProductCatalog = require('../../domain-layer/classes/ProductCatalog');

/**
 * Class describes a user.
 * @class User
 * @export
 */
class User {
    /**
     * Creates an User
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} address 
     * @param {string} email 
     * @param {string} phone 
     * @param {string} password 
     * @param {boolean} isAdmin 
     * @param {string} sessionID 
     * @param {string} id 
     */
    constructor(firstName, lastName, address, email, phone, password, isAdmin, sessionID, id) {
        this.isAdmin = isAdmin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.sessionID = sessionID;
        this.id = id;
        this.productCatalog = ProductCatalog.getProductCatalogInstance();
    }


    /**
     * Displays information about user object.
     * @method display
     */
    display() {
        console.log(this.isAdmin + ' ' + this.firstName + ' ' +
         this.lastName + ' ' + this.address + ' ' + this.email + ' ' + this.phone + ' ' + this.sessionID);
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
