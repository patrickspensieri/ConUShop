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

    constructor(productCatalog, user) {
        console.log(user);
        contract.precondition(user.isAdmin === false);
        this.productCatalog = productCatalog;
        this.quantity = 0;//max quantity of 7
        this.cart = [];
    }

    //add line item to shopping cart
    addToCart(prodSpec) {
        contract.precondition(this.quantity < 7);
        this.cart.push(orderItem);
        this.quantity++;
        contract.postcondition();

        let orderItem = getItem(prodSpec);
        cart.push(orderItem);

    }

    removeFromCart(orderItem) {
        contract.precondition(this.quantity > 0);
        var index = this.cart.indexOf(orderItem);
        if (index != 0){
            return this.cart.splice(index,1);
        }
    }

    getItem(modelNumber, callback) {
        this.productCatalog.getItemAndLock(modelNumber, function (err, result) {
            if (!err) {
                return callback(err, result);
            }
        });
    } 



}

module.exports = ShoppingCart;
