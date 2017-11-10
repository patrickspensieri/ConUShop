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
     * @param {object} Instance of Item
     * @param {int} Quantity of Item
     */
    static create(orderItemId, orderId, serialNumber, price, isReturned, itemObj, itemTimeout, productCatalog) {
        let orderItem = new OrderItem(orderItemId, orderId, serialNumber, price, isReturned, itemObj, itemTimeout, productCatalog);
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
        let orderItem = idMap.get('OrderItem', orderItemId);
        if (orderItem != null) {
            return callback(null, orderItem);
        } else {
            OrderItemTDG.find(orderItemId, function(err, result) {
                if (err) {
                    console.log('Error during OrderItem find query', null);
                } else {
                    let value = result[0];
                    if (result.length==0) {
                        return callback(err, null);
                    } else {
                        let orderItem = new OrderItem(value.orderItemId, value.orderId, value.serialNumber, value.price,
                            value.isReturned);
                        idMap.add(orderItem, orderItem.orderItemId);
                        return callback(null, orderItem);
                    }
                }
            });
        }
    }

  /**
   * Maps all returned values into objects of type OrderItem.
   * @static
   * @param {function} callback function that holds array of OrderItem object
   */
    static findAll(callback) {
        OrderItemTDG.findAll(function(err, result) {
            let orderItems = [];
            if (err) {
                console.log('Error during OrdersItem findALL query', null);
            } else {
                for (let value of result) {
                    let orderItem = new OrderItem(value.orderItemId, value.orderId, value.serialNumber, value.price,
                        value.isReturned);
                    orderItems.push(orderItem);
                    if (idMap.get('OrderItem', orderItem.orderItemId) == null) {
                        idMap.add(orderItem, orderItem.orderItemId);
                    }
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
                if (!err) {
                    idMap.add(OrderItemObject, OrderItemObject.orderItemId);
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
                if (!err) {
                    idMap.update(OrderItemObject, OrderItemObject.orderItemId);
                }
            });
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} OrderObject an object of type Order.
   */
    static delete(OrderItemObject) {
        OrderItemTDG.delete(OrderItemObject.orderItemId, function(err, result) {
            if (!err) {
                idMap.delete(OrderItemObject, OrderItemObject.orderItemId);
            }
        });
    }
}

module.exports = OrderItemMapper;
