let db = require('../../data-source-layer/db/index');

/**
 * Laptop table data gateway
 * @class LaptopTDG
 * @export
 */
class LaptopTDG {
  /**
   * Finds one object from the laptop table.
   * @static
   * @param {string} modelNumber model number of laptop to be found.
   * @param {function} callback function that holds laptop object.
   */
    static find(modelNumber, callback) {
        db.query('SELECT * FROM laptop WHERE model=$1', [modelNumber], (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Finds all objects from the laptop table.
   * @static
   * @param {function} callback function that holds array of laptop object.
   */
    static findAll(callback) {
        db.query('SELECT * FROM laptop', (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Inserts an object into the laptop table.
   * @static
   * @param {string} model model number of laptop.
   * @param {string} brand brand of laptop.
   * @param {number} display  size of laptop screen.
   * @param {string} processor processor in laptop.
   * @param {number} ram ram amount in laptop.
   * @param {number} storage storage size of laptop.
   * @param {number} cores amount of cores in processor in laptop.
   * @param {string} os operating system of laptop.
   * @param {string} battery battery information of laptop.
   * @param {string} camera camera information of laptop.
   * @param {boolean} touch is display touch or not.
   * @param {string} dimensions dimensions of laptop.
   * @param {number} weight weight of laptop.
   * @param {number} price price of laptop.
   * @param {function} callback function
   */
    static insert(model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight,
                  price, callback) {
        let queryString = 'INSERT INTO laptop (model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight, price) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
        let queryValues = [model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) =>{
            if (err) {
                console.log(err.message);
            }
            return callback(err, result);
        });
    }

  /**
   * Updates an object in the laptop table.
   * @static
   * @param {string} model model number of laptop.
   * @param {string} brand brand of laptop.
   * @param {number} display  size of laptop screen.
   * @param {string} processor processor in laptop.
   * @param {number} ram ram amount in laptop.
   * @param {number} storage storage size of laptop.
   * @param {number} cores amount of cores in processor in laptop.
   * @param {string} os operating system of laptop.
   * @param {string} battery battery information of laptop.
   * @param {string} camera camera information of laptop.
   * @param {boolean} touch is display touch or not.
   * @param {string} dimensions dimensions of laptop.
   * @param {number} weight weight of laptop.
   * @param {number} price price of laptop
   * @param {function} callback function
   */
    static update(model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight, price, callback) {
        let queryString = 'UPDATE laptop SET brand=$2, display=$3, processor=$4, ram=$5, storage=$6, cores=$7, os=$8, battery=$9, camera=$10, touch=$11, dimensions=$12, weight=$13, price=$14 WHERE model=$1';
        let queryValues = [model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
            return callback(err, result);
        });
    }

  /**
   * Deletes an objects in the laptop table.
   * @static
   * @param {string} id model number of laptop to be deleted.
   * @param {function} callback function
   */
    static delete(id, callback) {
        db.query('DELETE FROM laptop WHERE model=$1', [id], (err, result) => {
            if (err) {
                console.log(err.message);
            }
            console.log('This Laptop has been deleted from the database');
            return callback(err, result);
        });
    }

   /**
    * Return a laptop object
    * @param {function} callback 
    */

}

module.exports = LaptopTDG;
