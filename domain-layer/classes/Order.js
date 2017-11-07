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
    
    constructor(orderId, userId, orderDate, total, shoppingCart) {
       this.orderId = orderId;
       this.userId = userId;
       this.orderDate = orderDate;
       this.total = total;
       this.shoppingCart = shoppingCart;
       this.isCompleted = false;
    }

    makePurchase(client, shoppingCart){
        //...
    }
}

module.exports = Order;