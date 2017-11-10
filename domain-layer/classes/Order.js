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
    
    constructor(orderId, userId, orderDate, total) {
       this.orderId = orderId;
       this.userId = userId;
       this.orderDate = orderDate;
       this.total = total;
       this.isCompleted = false;
    }
}

module.exports = Order;
