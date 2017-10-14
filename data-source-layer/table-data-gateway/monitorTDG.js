let db = require('../data-source-layer/db/index');

/**
 * Monitor table data gateway
 * @class MonitorTDG
 * @export
 */
class MonitorTDG {
  /**
   * Finds one object from the monitor table.
   * @static
   * @param {string} id model number of monitor to be found.
   */
    static find(modelNumber, callback) {
        db.query('SELECT * FROM monitor WHERE model=$1', [modelNumber], (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Finds all objects from the monitor table.
   * @static
   */
    static findAll(callback) {
        db.query('SELECT * FROM monitor', (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Inserts an object into the monitor table.
   * @static
   * @param {string} model model number of monitor.
   * @param {string} brand brand of monitor.
   * @param {number} size  size of monitor screen.
   * @param {number} weight weight of monitor.
   * @param {number} price price of monitor.
   */
    static insert(model, brand, size, weight, price) {
        let queryString = 'INSERT INTO monitor (model, brand, size, weight, price) VALUES($1, $2, $3, $4, $5)';
        let queryValues = [model, brand, size, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

  /**
   * Updates an object in the monitor table.
   * @static
   * @param {string} model model number of monitor.
   * @param {string} brand brand of monitor.
   * @param {number} size  size of monitor screen.
   * @param {number} weight weight of monitor.
   * @param {number} price price of monitor.
   */
    static update(model, brand, size, weight, price) {
        let queryString = 'UPDATE monitor SET brand=$2, size=$3, weight=$4, price=$5 WHERE model=$1';
        let queryValues = [model, brand, size, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

  /**
   * Deletes an objects in the monitor table.
   * @static
   * @param {string} id model number of monitor to be deleted.
   */
    static delete(id) {
      db.query('DELETE FROM monitor WHERE model=$1', [id], (err, result) =>{
          if (err) {
              console.log(err.message);
          }
          console.log('This monitor has been deleted from the database');
      });
    }
}

module.exports = MonitorTDG;
