/**
 * Class describes a Order.
 * @class Order
 * @export
 */
class Order {
    /**
     * @constructor
     * @param {string} orderId  of the Order
     * @param {string} userId  of the Order
     * @param {Date} orderDate of the Order
     * @param {number} total of the Order
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
