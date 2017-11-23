let contract = require('obligations');
let OrderItemMapper = require('../mappers/OrderItemMapper');

/**
 * Class describes a ShoppingCart.
 * @class ShoppingCart
 * @export
 */
class ShoppingCart {
    /**
     * @constructor
     * @param {Object} productCatalog 
     * @param {Object} user
     */
    constructor(productCatalog, user) {
        contract.precondition(user.isadmin === false);
        this.productCatalog = productCatalog;
        this.cart = [];
        this.timeouts = [];
        this.isLocked = false;
    }

    /**
     * Add item to cart
     * @param {string} modelNumber 
     * @param {string} type
     * @param {*} callback 
     */
    addToCart(modelNumber, type, callback) {
        const self = this;
        contract.precondition(this.cart.length < 7);

        self.getItem(modelNumber, type, function(err, result) {
            if (result != null) {
                self.cart.push(result);

                let now = new Date();
                let timerExpiresAt = now.getTime() + 120000;
                let timeout = setTimeout(self.removeFromCart.bind(self), 120000, result.serialNumber, function(err, result) {});
                self.timeouts.push(timeout);
                result.itemTimeout = timerExpiresAt;

                return callback(null, result);
            }
            return callback(err, null);
        });
    }

    /**
     * Remove an item from the shopping cart
     * @param {string} serialNumber 
     * @param {*} callback 
     */
    removeFromCart(serialNumber, callback) {
        contract.precondition(this.cart.length > 0);

        const self = this;
        this.productCatalog.unlockItem(serialNumber, function(err, result) {
            if (!err) {
                for (let i = 0; i < self.cart.length; i++) {
                    if (self.cart[i].serialNumber == serialNumber) {
                        self.cart.splice(i, 1);
                        clearTimeout(self.timeouts[i]);
                        self.timeouts.splice(i, 1);
                        break;
                     }
                }
                return callback(err, 'Success');
            }
        });
    }

    /**
     * Remove all items from the shopping cart
     * @param {string} serialNumber
     * @param {*} callback
     */
    removeAllFromCart(callback) {
        contract.precondition(this.cart.length > 0);

        const self = this;
        let removed = 0;
        for (let i = 0; i < self.cart.length; i++) {
            let serialNumber = self.cart[i].serialNumber;

            this.productCatalog.unlockItem(serialNumber, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });

            if (++removed == self.cart.length) {
                self.cart = [];
                return callback(null, 'Success');
            }
        }
    }

    startPurchaseSession() {
        for (let i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i]);
        }
        this.timeouts = [];

        let now = new Date();
        let timerExpiresAt = now.getTime() + 120000;
        let timeout = setTimeout(this.removeAllFromCart.bind(this), 120000, function(err, result) {});
        this.timeouts.push(timeout);
        this.timeouts[0].timeout = timerExpiresAt;

        this.isLocked = true;
    }

    endPurchaseSession() {
        for (let i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i]);
        }
        this.timeouts = [];
        this.isLocked = false;
    }

    /**
     * Get an item from the shopping cart
     * @param {string} modelNumber 
     * @param {string} type 
     * @param {*} callback 
     */
    getItem(modelNumber, type, callback) {
        this.productCatalog.getItemAndLock(modelNumber, function(err, result) {
            if (!err) {
                result.type = type;
                let orderItem = OrderItemMapper.create(null, null, result.serialNumber, null, false, result, null);
                orderItem.setSpecification(function() {
                    return callback(null, orderItem);
                });
            } else {
                return callback(err, null);
            }
        });
    }

    /**
     * Get the total price of the shopping cart items
     * @return {number} returns the total
     */
    getTotal() {
        let total = 0;
        for (let i = 0; i < this.cart.length; i++) {
            total += parseFloat(this.cart[i].price);
        }
        total = Number(Math.round(total+'e'+2)+'e-'+2); // round to 2 decimals
        return total;
    }

    /**
     * Generates a random order id
     * @param {string} userId user id
     * @return {string} order id
     */
    generateOrderId(userId) {
        let d = new Date().getTime();
        let randomInt = Math.floor(Math.random() *10);
        let orderid = userId + '' + d + '' + randomInt;
        return orderid;
    }
}

module.exports = ShoppingCart;
