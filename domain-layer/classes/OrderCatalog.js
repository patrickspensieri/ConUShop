let OrderMapper = require('../mappers/OrderMapper');

/**
 * Class describes a OrderItem.
 * @class OrderItem
 * @export
 */
class OrderCatalog {
    /**
     * @constructor
     */
    constructor() {
       this.orders = null;
    }
    
    getOrders(userId, callback) {
        let self = this;
        OrderMapper.findAll(userId, function(err, result) {
            self.orders = result;
            return callback(err, result);
        });
    }

    getOrderDetails(orderId, callback) {
        for (let i = 0; i < this.orders.length; i++) {
            if (this.orders[i].orderId == orderId) {
                let inserted = 0;
                this.orders[i].getOrderItems(function(err, result) {
                    for (let i = 0; i < result.length; i++) {
                        result[i].setItemObject(function(err, result2) {
                            if (++inserted == result.length) {
                                return callback(err, result);
                            }
                        });
                    }
                });
            }
        }
    }
}

module.exports = OrderCatalog;
