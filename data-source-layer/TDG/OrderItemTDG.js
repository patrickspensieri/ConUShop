let db = require('../../data-source-layer/db/index');

/**
 * Order table data gateway
 * @class OrderItemTDG
 * @export
 */
class OrderItemTDG {
  /**
   * Finds one object from the Order table.
   * @static
   * @param {string} orderItemId model number of Order to be found.
   * @param {function} callback function that holds Order object.
   */
    static find(orderItemId, callback) {
        db.query('SELECT * FROM OrderItem WHERE order_item_id=$1 AND order_id=$2', [orderItemId, orderId], (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Finds all objects from the OrderItem table.
   * @static
   * @param {string} orderId brand of OrderId.
   * @param {function} callback function that holds array of Order object.
   */
    static findAll(orderId, callback) {
        db.query('SELECT * FROM OrderItem where order_id=$1', [orderId], (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Inserts an object into the OrderItem Table.
   * @static
   * @param {string} orderItemId model number of Order.
   * @param {string} orderId brand of Order.
   * @param {number} serialNumber  size of Order screen.
   * @param {number} price weight of Order.
   * @param {number} isReturned weight of Order.
   * @param {function} callback
   */
    static insert(orderItemId, orderId, serialNumber, price, isReturned,callback) {
        let queryString = 'INSERT INTO OrderItem (order_item_id, order_id, serialNumber, price, isReturned) VALUES($1, $2, $3, $4 ,$5)';
        let queryValues = [orderItemId, orderId, serialNumber, price, isReturned];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
            return callback(err, result);
        });
    }

  /**
   * Updates an object in the Order table.
   * @static
   * @param {string} orderItemId model number of Order.
   * @param {string} orderId brand of Order.
   * @param {number} serialNumber  size of Order screen.
   * @param {number} price weight of Order.
   * @param {number} isReturned weight of Order.
   * @param {function} callback
   */
    static update(orderItemId, orderId, serialNumber, price, isReturned, callback) {
        let queryString = 'UPDATE OrderItem SET order_id=$2, serialNumber=$3, price=$4, isReturned=$5 WHERE order_item_id=$1';
        let queryValues = [orderItemId, orderId, serialNumber, price, isReturned];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
            return callback(err, result);
        });
    }

  /**
   * Deletes an objects in the Order table.
   * @static
   * @param {string} orderItemId model number of Order to be deleted.
   * @param {function} callback
   */
    static delete(orderItemId, callback) {
      db.query('DELETE FROM OrderItem WHERE order_item_id=$1', [orderItemId], (err, result) =>{
          if (err) {
              console.log(err.message);
          }
          console.log('This OrderItem has been deleted from the database');
          return callback(err, result);
      });
    }
}

module.exports = OrderItemTDG;
