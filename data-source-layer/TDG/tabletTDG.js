let db = require('../db/index');

/**
 * Tablet table data gateway
 * @class TabletTDG
 * @export
 */
class TabletTDG {
  /**
   * Finds one object from the tablet table.
   * @static
   * @param {string} id model number of tablet to be found.
   */
    static find(id, callback) {
        db.query('SELECT * FROM tablet WHERE model=$1', [id], (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Finds all objects from the tablet table.
   * @static
   */
    static findAll(callback) {
        db.query('SELECT * FROM tablet', (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Inserts an object into the tablet table.
   * @static
   * @param {string} model model number of tablet.
   * @param {string} brand brand of tablet.
   * @param {number} display  size of tablet screen.
   * @param {string} processor processor in tablet.
   * @param {number} ram ram amount in tablet.
   * @param {number} storage storage size of tablet.
   * @param {number} cores amount of cores in processor in tablet.
   * @param {string} os operating system of tablet.
   * @param {string} battery battery information of tablet.
   * @param {string} camera camera information of tablet.
   * @param {string} dimensions dimensions of tablet.
   * @param {number} weight weight of tablet.
   * @param {number} price price of tablet.
   */
    static insert(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price) {
        let queryString = 'INSERT INTO tablet (model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
        let queryValues = [model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) =>{
            if (err) {
                console.log(err.message);
            }
        });
    }

  /**
   * Updates an object in the tablet table.
   * @static
   * @param {string} model model number of tablet.
   * @param {string} brand brand of tablet.
   * @param {number} display  size of tablet screen.
   * @param {string} processor processor in tablet.
   * @param {number} ram ram amount in tablet.
   * @param {number} storage storage size of tablet.
   * @param {number} cores amount of cores in processor in tablet.
   * @param {string} os operating system of tablet.
   * @param {string} battery battery information of tablet.
   * @param {string} camera camera information of tablet.
   * @param {string} dimensions dimensions of tablet.
   * @param {number} weight weight of tablet.
   * @param {number} price price of tablet
   */
    static update(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price) {
        let queryString = 'UPDATE tablet SET brand=$2, display=$3, processor=$4, ram=$5, storage=$6, cores=$7, os=$8, battery=$9, camera=$10, dimensions=$11, weight=$12, price=$13 WHERE model=$1';
        let queryValues = [model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

  /**
   * Deletes an objects in the tablet table.
   * @static
   * @param {string} id model number of tablet to be deleted.
   */
    static delete(id) {
        db.query('DELETE FROM tablet WHERE model=$1', [id], (err, result) => {
            if (err) {
                console.log(err.message);
            }
            console.log('This Tablet has been deleted from the database');
        });
    }
}

module.exports = TabletTDG;
