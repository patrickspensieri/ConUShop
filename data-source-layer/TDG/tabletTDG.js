let db = require('../db');

/**
 * Tablet table data gateway
 * @class laptopTDG
 * @export
 */
class tabletTDG {
  /**
   * Finds one object from the tablet table.
   * @static
   * @param {string} id model number of tablet to be found.
   */
    static find(id) {
        db.connect();
        db.query('SELECT * FROM tablet WHERE "modelId"=$1', [id], (err, result) => {
            if (err) {
                console.log(err.message);
            }
            db.end();
            return result.rows;
        });
    }

  /**
   * Finds all objects from the tablet table.
   * @static
   */
    static findAll() {
        db.connect();
        db.query('SELECT * FROM tablet', (err, result) => {
            if (err) {
                console.log(err.message);
            }
            db.end();
            return result.rows;
        });
    }

  /**
   * Inserts an object into the tablet table.
   * @static
   * @param {string} modelNumber model number of tablet.
   * @param {string} brand brand of tablet.
   * @param {number} displaySize  size of tablet screen.
   * @param {string} processor processor in tablet.
   * @param {number} ram ram amount in tablet.
   * @param {number} hardDrive hardDrive size of tablet.
   * @param {number} cpuCores amount of cores in processor in tablet.
   * @param {string} os operating system of tablet.
   * @param {string} battery battery information of tablet.
   * @param {string} camera camera information of tablet.
   * @param {string} dimensions dimensions of tablet.
   * @param {number} weight weight of tablet.
   * @param {number} price price of tablet.
   */
    static insert() {
        db.connect();

        let queryString = 'INSERT INTO tablet VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
        let queryValues = [modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) =>{
            if (err) {
                console.log(err.message);
            }
            db.end();
        });
    }

  /**
   * Updates an object in the tablet table.
   * @static
   * @param {string} modelNumber model number of tablet.
   * @param {string} brand brand of tablet.
   * @param {number} displaySize  size of tablet screen.
   * @param {string} processor processor in tablet.
   * @param {number} ram ram amount in tablet.
   * @param {number} hardDrive hardDrive size of tablet.
   * @param {number} cpuCores amount of cores in processor in tablet.
   * @param {string} os operating system of tablet.
   * @param {string} battery battery information of tablet.
   * @param {string} camera camera information of tablet.
   * @param {string} dimensions dimensions of tablet.
   * @param {number} weight weight of tablet.
   * @param {number} price price of tablet
   */
    static update(modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, dimensions, weight, price) {
        db.connect();
        let queryString = 'UPDATE tablet SET brand=$2, displaySize=$3, processor=$4, ram=$5, hardDrive=$6, cpuCores=$7, os=$8, battery=$9, camera=$10, dimensions=$11, weight=$12, price=$13, WHERE "modelId"=$1';
        let queryValues = [modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
            db.end();
        });
    }

  /**
   * Deletes an objects in the tablet table.
   * @static
   * @param {string} id model number of tablet to be deleted.
   */
    static delete(id) {
        db.connect();

        db.query('DELETE FROM tablet WHERE "modelId"=$1', [id], (err, result) => {
            if (err) {
                console.log(err.message);
            }
            db.end();
            console.log('This Tablet has been deleted from the database');
        });
    }
}

module.exports = tabletTDG;
