let db = require('../../data-source-layer/db/index');

/**
 * Order table data gateway
 * @class OrderTDG
 * @export
 */
class OrderTDG {
  /**
   * Finds one object from the Order table.
   * @static
   * @param {string} orderId model number of Order to be found.
   * @param {function} callback function that holds Order object.
   */
    static find(orderId, callback) {
        db.query('SELECT * FROM Order WHERE order_id=$1 AND user_id=$2', [orderId, userId], (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Finds all objects from the Order table.
   * @static
   * @param {string} userId brand of Order.
   * @param {function} callback function that holds array of Order object.
   */
    static findAll(userId, callback) {
        db.query('SELECT * FROM Order where user_id=$1', [userId], (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Inserts an object into the Order table.
   * @static
   * @param {string} orderId model number of Order.
   * @param {string} userId brand of Order.
   * @param {number} orderDate  size of Order screen.
   * @param {number} total weight of Order.
   * @param {function} callback
   */
    static insert(orderId, userId, orderDate, total, callback) {
        let queryString = 'INSERT INTO Order (order_id, user_id, orderDate, total) VALUES($1, $2, $3, $4)';
        let queryValues = [orderId, userId, orderDate, total];

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
   * @param {string} orderId model number of Order.
   * @param {string} userId brand of Order.
   * @param {number} orderDate  size of Order screen.
   * @param {number} total weight of Order.
   * @param {function} callback
   */
    static update(orderId, userId, orderDate, total, callback) {
        let queryString = 'UPDATE Order SET user_id=$2, orderDate=$3, total=$4 WHERE order_id=$1';
        let queryValues = [model, brand, size, weight, price];

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
   * @param {string} orderId model number of Order to be deleted.
   * @param {function} callback
   */
    static delete(orderId, callback) {
      db.query('DELETE FROM Order WHERE model=$1', [id], (err, result) =>{
          if (err) {
              console.log(err.message);
          }
          console.log('This Order has been deleted from the database');
          return callback(err, result);
      });
    }
}

module.exports = OrderTDG;
