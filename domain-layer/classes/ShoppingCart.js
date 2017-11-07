let contract = require('obligations');
let ProductCatalog = require('ProductCatalog');
let OrderItem = require('OrderItem');
let user = require('User');
/* global Map */

/**
 * Class describes a ShoppingCart.
 * @class ShoppingCart
 * @export
 */

class ShoppingCart {
    /**
     * @constructor
     * @param {object} Instace of productCatalog
     * @param {object} Instance of orderItem
     */

    constructor(productCatalog, orderItem, user) {
        contract.procondition(user.isAdmin === false);
        this.productCatalog = productCatalog;
        this.orderItem = orderItem;
        this.quantity = 0;//max quantity of 7
        this.cart = [];
        
    }
    
    addToCart(orderItem){
        contract.precondition(this.quantity < 7);
        this.cart.push(orderItem);
        this.quantity++;
        contract.postcondition();
    }
    
    removeFromCart(orderItem){
        contract.precondition(this.quantity > 0);
        var index = this.cart.indexOf(orderItem);
        if (index != 0){
            return this.cart.splice(index,1);
        }
    }
    
    
    
    
    
}

module.exports = ShoppingCart;