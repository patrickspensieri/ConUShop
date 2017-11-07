/**
 * Class describes a Order.
 * @class Order
 * @export
 */

class Order {
    /**
     * @constructor
     * @param {object} Instance of ShoppingCart
     */
    
    constructor(shoppingCart) {
       this.shoppingCart = shoppingCart;
    }
}

module.exports = Order;