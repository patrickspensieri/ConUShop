let db = require('../db');

/**
 * Laptop table data gateway
 * @class laptopTDG
 * @export
 */
class laptopTDG {
  /**
   * Finds one object from the laptop table.
   * @static
   * @param {string} id model number of laptop to be found.
   */
    static find(id) {
        db.connect();
        db.query('SELECT * FROM laptop WHERE "modelId"=$1', [id], (err, result) => {
            if (err) {
                console.log(err.message);
            }
            db.end();
            console.log(result.rows);
            return result.rows;
        });
    }

  /**
   * Finds all objects from the laptop table.
   * @static
   */
    static findAll() {
        db.connect();

        db.query('SELECT * FROM laptop', (err, result) => {
            if (err) {
                console.log(err.message);
            }
            db.end();
            console.log(result.rows);
            return result.rows;
        });
    }

  /**
   * Inserts an object into the laptop table.
   * @static
   * @param {string} modelNumber model number of laptop.
   * @param {string} brand brand of laptop.
   * @param {number} displaySize  size of laptop screen.
   * @param {string} processor processor in laptop.
   * @param {number} ram ram amount in laptop.
   * @param {number} hardDrive hardDrive size of laptop.
   * @param {number} cpuCores amount of cores in processor in laptop.
   * @param {string} os operating system of laptop.
   * @param {string} battery battery information of laptop.
   * @param {string} camera camera information of laptop.
   * @param {boolean} touchScreen is display touchscreen or not.
   * @param {string} dimensions dimensions of laptop.
   * @param {number} weight weight of laptop.
   * @param {number} price price of laptop.
   */
    static insert(modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, touchScreen, dimensions, weight, price) {
        db.connect();

        let queryString = 'INSERT INTO laptop VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
        let queryValues = [modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, touchScreen, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) =>{
            if (err) {
                console.log(err.message);
            }
            db.end();
        });
    }

  /**
   * Updates an object in the laptop table.
   * @static
   * @param {string} modelNumber model number of laptop.
   * @param {string} brand brand of laptop.
   * @param {number} displaySize  size of laptop screen.
   * @param {string} processor processor in laptop.
   * @param {number} ram ram amount in laptop.
   * @param {number} hardDrive hardDrive size of laptop.
   * @param {number} cpuCores amount of cores in processor in laptop.
   * @param {string} os operating system of laptop.
   * @param {string} battery battery information of laptop.
   * @param {string} camera camera information of laptop.
   * @param {boolean} touchScreen is display touchscreen or not.
   * @param {string} dimensions dimensions of laptop.
   * @param {number} weight weight of laptop.
   * @param {number} price price of laptop
   */
    static update(modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, touchScreen, dimensions, weight, price) {
        db.connect();
        let queryString = 'UPDATE laptop SET brand=$2, displaySize=$3, processor=$4, ram=$5, hardDrive=$6, cpuCores=$7, os=$8, battery=$9, camera=$10, touchScreen=$11, dimensions=$12, weight=$13, price=$14, WHERE "modelId"=$1';
        let queryValues = [modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, touchScreen, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
            db.end();
        });
    }

  /**
   * Deletes an objects in the laptop table.
   * @static
   * @param {string} id model number of laptop to be deleted.
   */
    static delete(id) {
        db.connect();

        db.query('DELETE FROM laptop WHERE "modelId"=$1', [id], (err, result) => {
            if (err) {
                console.log(err.message);
            }
            db.end();
            console.log('This Laptop has been deleted from the database');
        });
    }
}

module.exports = laptopTDG;
