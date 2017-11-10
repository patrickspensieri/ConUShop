let contract = require('obligations');
let ProductCatalog = require('../classes/ProductCatalog');
let OrderItem = require('../classes/OrderItem');
let User = require('../classes/User');
let OrderItemMapper = require('../mappers/OrderItemMapper');
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
     * @param {*} modelNumber 
     * @param {*} type
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
    getItem(modelNumber, type, callback) {
        let self = this;
        this.productCatalog.getItemAndLock(modelNumber, function(err, result) {
            if (!err) {
                result.type = type;
                let orderItem = OrderItemMapper.create(null, null, result.serialNumber, null, null, result, null, self.productCatalog);
                orderItem.setSpecification(function() {
                    return callback(null, orderItem);
                })
            }
        });
    }

    getTotal(callback) {
        let self = this;
        let inserted = 0;
        let total = 0;
        for (let i = 0; i < this.cart.length; i++) {
            this.productCatalog.getProductSpecification(this.cart[i].type, this.cart[i].modelNumber, function(err, result) {
                if (!err) {
                    total += parseFloat(result.price);
                    self.cart[i].setPrice(result.price);
                }
                if (++inserted == self.cart.length) {
                    return callback(total);
                }
            });
        }
    }

    generateOrderId(userId) {
        let d = new Date().getTime();
        let randomInt = Math.floor(Math.random() *10);
        let orderid = userId + '' + d + '' + randomInt;
        return orderid;
    }

    generateOIID(orderId, serialNumber) {
        let ooid = orderId + '' + serialNumber;
        return ooid;
    }
}

module.exports = ShoppingCart;
