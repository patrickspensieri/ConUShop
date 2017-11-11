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
        contract.precondition(user.isAdmin === false);
        this.productCatalog = productCatalog;
        this.quantity = 0; // max quantity of 7
        this.cart = [];
    }

    /**
     * Add item to cart
     * @param {string} modelNumber 
     * @param {string} type
     * @param {*} callback 
     */
    addToCart(modelNumber, type, callback) {
        const self = this;
        contract.precondition(this.quantity < 7);
        this.quantity++;

        self.getItem(modelNumber, type, function(err, result) {
            self.cart.push(result);
            return callback(err, result);
        });
    }

    /**
     * Remove an item from the shopping cart
     * @param {string} serialNumber 
     * @param {*} callback 
     */
    removeFromCart(serialNumber, callback) {
        contract.precondition(this.quantity > 0);
        const self = this;
        this.productCatalog.unlockItem(serialNumber, function(err, result) {
            if (!err) {
                for (let i = 0; i < self.cart.length; i++) {
                    if (self.cart[i].serialNumber == serialNumber) {
                        self.cart.splice(i, 1);
                        break;
                     }
                }
                return callback(err, 'Success');
            }
        });
    }

    /**
     * Get an item from the shopping cart
     * @param {string} modelNumber 
     * @param {string} type 
     * @param {*} callback 
     */
    getItem(modelNumber, type, callback) {
        let self = this;
        this.productCatalog.getItemAndLock(modelNumber, function(err, result) {
            if (!err) {
                result.type = type;
                let orderItem = OrderItemMapper.create(null, null, result.serialNumber, null, false, result, null, self.productCatalog);
                orderItem.setSpecification(function() {
                    return callback(null, orderItem);
                });
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
