let OrderItemMapper = require('../mappers/OrderItemMapper');

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
       this.orderItems = null;
       this.isLocked = false;
    }

    /**
     * OrderItems accessor
     * @param {*} callback 
     */
    getOrderItems(callback) {
        let self = this;
        OrderItemMapper.findAll(this.orderId, function(err, result) {
            self.orderItems = result;
            return callback(err, result);
        });
    }

    getOrderItem(orderItemId) {
        for (let i = 0; i < this.orderItems.length; i++) {
            if (orderItemId == this.orderItems[i].orderItemId) {
                return this.orderItems[i];
            }
        }
    }

    startReturnSession() {
        this.isLocked = true;
    }

    endReturnSession() {
        this.isLocked = false;
    }
}

module.exports = Order;
