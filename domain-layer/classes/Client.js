let User = require('./User');
let ProductCatalog = require('./ProductCatalog');
let ShoppingCart = require('./ShoppingCart');
let OrderMapper = require('../mappers/OrderMapper');
let moment = require('moment');
let OrderCatalog = require('./OrderCatalog');
let OrderItemMapper = require('../mappers/OrderItemMapper');
let ItemMapper = require('../mappers/ItemMapper');

/**
 * Class describes a Client.
 * @class Client
 * @export
 */
class Client extends User {
    /**
     * Creates a client user
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
        this.shoppingcart = new ShoppingCart(this.productCatalog, this);
        this.orderCatalog = new OrderCatalog();
    }

    /**
     * Function that returns all the items existing in the product catalog
     * @param {string} productType string of the Object
     * @param {function} callback function
     * @return {Object} product catalog's inventory
     */
    getProductInventory(productType, callback) {
        return this.productCatalog.getAllProductInventory(productType, callback);
    }

    /**
     * Function that allows clients to purchase items from the product Catalog
     * @param {*} callback 
     */
    makePurchase(callback) {
        if (this.shoppingcart.cart.length > 0) {
            let self = this;
            let total = this.shoppingcart.getTotal();
            let orderId = self.shoppingcart.generateOrderId(self.id);
            let date = moment().format('YYYY-MM-DD');
            let order = OrderMapper.create(orderId, self.id, date, total);
            for (let i = 0; i < this.shoppingcart.cart.length; i++) {
                this.shoppingcart.cart[i].setOrderItemId(orderId);
            }
            OrderMapper.insertPurchase(order, this.shoppingcart.cart, function(err, result) {
                self.shoppingcart.cart = [];
                return callback(null, null);
            });
        } else {
            console.log('Shopping cart empty');
            return callback(null, null);
        }
    }

    getOrders(callback) {
        this.orderCatalog.getOrders(this.id, function(err, result) {
            return callback(err, result);
        });
    }

    getOrderDetails(orderId, callback) {
        this.orderCatalog.getOrderDetails(orderId, function(err, result) {
            return callback(err, result);
        });
    }

    returnItem(orderItemId, callback) {
        OrderItemMapper.find(orderItemId, function(err, result) {
            result.isReturned = true;
            console.log(result);
            UOW.registerDirty(result);
            ItemMapper.find(result.serialNumber, function(err, result2) {
                result2.islocked = false;
                UOW.registerDirty(result2);
                UOW.commit();
                return callback(err, null);
            });
        });
    }
}

module.exports = Client;
