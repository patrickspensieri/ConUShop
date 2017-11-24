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
        this.shoppingcart = new ShoppingCart(ProductCatalog.getProductCatalogInstance(), this);
        this.orderCatalog = new OrderCatalog();
    }

    /**
     * Function that allows clients to purchase items from the product Catalog
     * @param {*} callback
     * @return {*}
     */
    makePurchase(callback) {
        if (this.shoppingcart.getCart().length > 0) {
            let self = this;
            let total = this.shoppingcart.getTotal();
            let orderId = self.shoppingcart.generateOrderId(self.id);
            let date = moment().format('YYYY-MM-DD');
            let order = OrderMapper.create(orderId, self.id, date, total);
            for (let i = 0; i < this.shoppingcart.getCart().length; i++) {
                this.shoppingcart.getCart()[i].setOrderItemId(orderId);
            }
            OrderMapper.insertPurchase(order, this.shoppingcart.getCart(), function(err, result) {
                self.shoppingcart.emptyCart();
                return callback(null, null);
            });
        } else {
            console.log('Shopping cart empty');
            return callback(null, null);
        }
    }

    /**
     * Cancels a purchase.
     * @param {*} callback
     */
    cancelPurchase(callback) {
        this.shoppingcart.removeAllFromCart(callback);
    }

    /**
     * @param {Integer} orderItemId
     * @param {*} callback
     */
    returnItem(orderItemId, callback) {
        OrderItemMapper.find(orderItemId, function(err, result) {
            if (result.isReturned == true) {
                console.log('item is already returned');
                return callback(err, null);
            } else {
                result.isReturned = true;
                UOW.registerDirty(result);
                ItemMapper.find(result.serialNumber, function(err, result2) {
                    result2.isLocked = false;
                    UOW.registerDirty(result2);
                    UOW.commit();
                    return callback(err, null);
                });
            }
        });
    }
}

module.exports = Client;
