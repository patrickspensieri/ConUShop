let db = require('../../data-source-layer/db/index');

/**
 * Monitor table data gateway
 * @class MonitorTDG
 * @export
 */
class MonitorTDG {
  /**
   * Finds one object from the monitor table.
   * @static
   * @param {string} modelNumber model number of monitor to be found.
   * @param {function} callback function that holds monitor object.
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
   * @param {function} callback function that holds array of monitor object.
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
     * Finds monitor version from the monitor table.
     * @static
     * @param {string} modelNumber model number of monitor to be found.
     * @param {function} callback function that holds monitor object.
     */
    static findVersion(modelNumber, callback) {
        db.query('SELECT version FROM monitor WHERE model=$1', [modelNumber], (err, result) => {
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
   * @param {function} callback
   */
    static insert(model, brand, size, weight, price, callback) {
        let queryString = 'INSERT INTO monitor (model, brand, size, weight, price) VALUES($1, $2, $3, $4, $5)';
        let queryValues = [model, brand, size, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
            return callback(err, result);
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
   * @param {number} version version of monitor.
   * @param {function} callback
   */
    static update(model, brand, size, weight, price, version, callback) {
        let queryString = 'UPDATE monitor SET brand=$2, size=$3, weight=$4, price=$5, version=$6 WHERE model=$1';
        let queryValues = [model, brand, size, weight, price, version];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
            return callback(err, result);
        });
    }

  /**
   * Deletes an objects in the monitor table.
   * @static
   * @param {string} id model number of monitor to be deleted.
   * @param {function} callback
   */
    static delete(id, callback) {
      db.query('DELETE FROM monitor WHERE model=$1', [id], (err, result) =>{
          if (err) {
              console.log(err.message);
          }
          console.log('This monitor has been deleted from the database');
          return callback(err, result);
      });
    }

    /**
     * Returns a monitor object
     * @param {function} callback 
     */
    static getMonitor(callback) {
        db.query('SELECT DISTINCT d.model, d.brand, d.size, d.weight, d.price, d.version FROM monitor d INNER JOIN Item i on i.model = d.model;', (err, result) =>{
            if (err) {
                console.log(err.message);
            } else {
                console.log('Monitor success');
                return callback(null, result.rows);
            }
        });
    }
}

module.exports = MonitorTDG;
