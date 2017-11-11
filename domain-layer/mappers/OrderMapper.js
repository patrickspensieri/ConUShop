let OrderTDG = require('../../data-source-layer/TDG/OrderTDG');
let Order = require('../../domain-layer/classes/Order');
let AbstractMapper = require('./AbstractMapper');

/**
 * Order object mapper
 * @class OrderMapper
 * @export
 */
class OrderMapper extends AbstractMapper {
  /**
   * Creates a new Order
   * @static
   * @param {string} orderId id number of Order.
   * @param {string} userId brand of Order.
   * @param {number} orderDate  size of Order screen.
   * @param {number} total weight of Order.
   * @return {Order} Order object.
   */
    static create(orderId, userId, orderDate, total) {
        let order = new Order(orderId, userId, orderDate, total);
        return order;
    }

  /**
   * Maps the returned value to an object of type Order.
   * @static
   * @param {string} orderId id number of Order to be found.
   * @param {function} callback function that holds Order object
   * @return {function} callback object
   */
    static find(orderId, callback) {
        let order = idMap.get('Order', orderId);
        if (order != null) {
            return callback(null, order);
        } else {
            OrderTDG.find(orderId, function(err, result) {
                if (err) {
                    console.log('Error during Order find query', null);
                } else {
                    let value = result[0];
                    if (result.length==0) {
                        return callback(err, null);
                    } else {
                        let order = new Order(value.orderId, value.userId, value.orderDate,
                            value.total, value.shoppingCart);
                        idMap.add(order, order.id);
                        return callback(null, order);
                    }
                }
            });
        }
    }

  /**
   * Maps all returned values into objects of type Order.
   * @static
   * @param {function} callback function that holds array of Order object
   */
    static findAll(callback) {
        OrderTDG.findAll(function(err, result) {
            let orders = [];
            if (err) {
                console.log('Error during Orders findALL query', null);
            } else {
                for (let value of result) {
                    let order = new Order(value.orderId, value.userId, value.orderDate,
                        value.total, value.shoppingCart);
                    orders.push(order);
                    if (idMap.get('Order', order.orderId) == null) {
                        idMap.add(order, order.orderId);
                    }
                }
                return callback(null, orders);
            }
        });
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} OrderObject an object of type Order.
   */
    static insert(OrderObject) {
        OrderTDG.insert(OrderObject.orderId, OrderObject.userId, OrderObject.orderDate,
            OrderObject.total, function(err, result) {
                if (!err) {
                    idMap.add(OrderObject, OrderObject.orderId);
                }
            });
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} OrderObject an object of type Order.
   */
    static update(OrderObject) {
        OrderTDG.update(OrderObject.orderId, OrderObject.userId, OrderObject.orderDate,
            OrderObject.total, function(err, result) {
                if (!err) {
                    idMap.update(OrderObject, OrderObject.orderId);
                }
            });
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} OrderObject an object of type Order.
   */
    static delete(OrderObject) {
        OrderTDG.delete(OrderObject.orderId, function(err, result) {
            if (!err) {
                idMap.delete(OrderObject, OrderObject.orderId);
            }
        });
    }

    /**
     * Inserts purchase to UOW
     * @param {*} orderObject 
     * @param {*} orderItemsArray 
     * @param {*} callback 
     * @return {*} callback
     */
    static insertPurchase(orderObject, orderItemsArray, callback) {
        UOW.registerNew(orderObject);
        for (let i = 0; i < orderItemsArray.length; i++) {
            UOW.registerNew(orderItemsArray[i]);
        }
        UOW.commit();
        return callback(null, 'Success');
    }
}

module.exports = OrderMapper;
