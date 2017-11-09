let contract = require('obligations');
let ProductCatalog = require('../classes/ProductCatalog');
let OrderItem = require('../classes/OrderItem');
let User = require('../classes/User');
/* global Map */

/**
 * Class describes a ShoppingCart.
 * @class ShoppingCart
 * @export
 */
class ShoppingCart {
    /**
     * @constructor
     * @param {object} Instance of productCatalog
     * @param {object} Instance of orderItem
     */

     /**
      * Constructor
      */
    constructor(productCatalog, user) {
        contract.precondition(user.isAdmin === false);
        this.productCatalog = productCatalog;
        this.quantity = 0; // max quantity of 7
        this.cart = [];
    }

    /**
     * Add item to cart
     * @param {*} prodSpec 
     * @param {*} callback 
     */
    addToCart(prodSpec, callback) {
        const self = this;
        contract.precondition(this.quantity < 7);
        this.quantity++;

        self.getItem(prodSpec, function(err, result) {
            self.cart.push(result);
            return callback(err, result);
        });
    }

    /**
     * Remove item from cart
     * @param {*} serialNumber 
     */
    removeFromCart(serialNumber, callback) {
        contract.precondition(this.quantity > 0);
        // let index = this.cart.indexOf(orderItem);
        // if (index != 0) {
        //     return this.cart.splice(index, 1);
        // }
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
     * Get an Item from database
     */
    getItem(modelNumber, callback) {
        this.productCatalog.getItemAndLock(modelNumber, function(err, result) {
            if (!err) {
                return callback(err, result);
            }
        });
    }
}

module.exports = ShoppingCart;
