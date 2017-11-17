let OrderItemTDG = require('../../data-source-layer/TDG/OrderItemTDG');
let OrderItem = require('../../domain-layer/classes/OrderItem');
let AbstractMapper = require('./AbstractMapper');

/**
 * OrderItem object mapper
 * @class OrderItemMapper
 * @export
 */
class OrderItemMapper extends AbstractMapper {
    /**
     * Creates a new OrderItem
     * @param {string} orderItemId 
     * @param {string} orderId 
     * @param {string} serialNumber 
     * @param {number} price 
     * @param {boolean} isReturned 
     * @param {Object} itemObj 
     * @param {Date} itemTimeout 
     * @param {Object} productCatalog
     * @return {Object} order item
     */
    static create(orderItemId, orderId, serialNumber, price, isReturned, itemObj, itemTimeout) {
        let orderItem = new OrderItem(orderItemId, orderId, serialNumber, price, isReturned, itemObj, itemTimeout);
        return orderItem;
    }

  /**
   * Maps the returned value to an object of type OrderItem.
   * @static
   * @param {string} orderItemId id number of OrderItem to be found.
   * @param {function} callback function that holds OrderItem object
   * @return {function} callback object
   */
    static find(orderItemId, callback) {
            OrderItemTDG.find(orderItemId, function(err, result) {
                if (err) {
                    console.log('Error during OrderItem find query', null);
                } else {
                    let value = result[0];
                    if (result.length==0) {
                        return callback(err, null);
                    } else {
                        let orderItem = new OrderItem(value.order_item_id, value.order_id, value.serialnumber, value.price,
                            value.isreturned);
                        idMap.add(orderItem, orderItem.orderItemId);
                        return callback(null, orderItem);
                    }
                }
            });
    }

  /**
   * Maps all returned values into objects of type OrderItem.
   * @static
   * @param {function} callback function that holds array of OrderItem object
   */
    static findAll(orderId, callback) {
        OrderItemTDG.findAll(orderId, function(err, result) {
            let orderItems = [];
            if (err) {
                console.log('Error during OrdersItem findALL query', null);
            } else {
                for (let value of result) {
                    let orderItem = new OrderItem(value.order_item_id, value.order_id, value.serialnumber, value.price,
                        value.isreturned);
                    orderItems.push(orderItem);
                }
                return callback(null, orderItems);
            }
        });
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} OrderItemObject an object of type OrderItem.
   */
    static insert(OrderItemObject) {
        OrderItemTDG.insert(OrderItemObject.orderItemId, OrderItemObject.orderId, OrderItemObject.serialNumber,
            OrderItemObject.price, OrderItemObject.isReturned,
            function(err, result) {
                if (err) {
                   console.log(err);
                }
            });
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} OrderItemObject an object of type OrderItem.
   */
    static update(OrderItemObject) {
        OrderItemTDG.update(OrderItemObject.orderItemId, OrderItemObject.orderId, OrderItemObject.serialNumber,
            OrderItemObject.price, OrderItemObject.isReturned,
            function(err, result) {
                if (err) {
                   console.log(err);
                }
            });
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} OrderItemObject an object of type Order.
   */
    static delete(OrderItemObject) {
        OrderItemTDG.delete(OrderItemObject.orderItemId, function(err, result) {
            if (err) {
                console.log(err);
            }
        });
    }
}

module.exports = OrderItemMapper;
