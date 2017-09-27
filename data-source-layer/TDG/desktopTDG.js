let db = require('../db');

/**
 * Desktop table data gateway
 * @class desktopTDG
 * @export
 */
class desktopTDG {
  /**
   * Finds one object from the desktop table.
   * @static
   * @param {string} id model number of desktop to be found.
   */
    static find(id) {
        db.connect();

        db.query('SELECT * FROM desktop WHERE "modelId"=$1', [id], (err, result) => {
            if (err) {
                console.log(err.message);
            }
            db.end();
            return result.rows;
        });
    }

  /**
   * Finds all objects from the desktop table.
   * @static
   */
    static findAll() {
        db.connect();

        db.query('SELECT * FROM desktop', (err, result) => {
            if (err) {
                console.log(err.message);
            }
            db.end();
            return result.rows;
        });
    }

  /**
   * Inserts an object into the desktop table.
   * @static
   * @param {string} modelNumber model number of desktop.
   * @param {string} brand brand of desktop.
   * @param {string} processor processor in desktop.
   * @param {number} ram ram amount in desktop.
   * @param {number} hardDrive hardDrive size of desktop.
   * @param {number} cpuCores amount of cores in processor in desktop.
   * @param {string} dimensions dimensions of desktop.
   * @param {number} weight weight of desktop.
   * @param {number} price price of desktop.
   */
    static insert(modelNumber, brand, processor, ram, hardDrive, cpuCores, dimensions, weight, price) {
        db.connect();

        let queryString = 'INSERT INTO desktop VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        let queryValues = [modelNumber, brand, processor, ram, hardDrive, cpuCores, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
            db.end();
        });
    }

  /**
   * Updates an object in the desktop table.
   * @static
   * @param {string} modelNumber model number of desktop.
   * @param {string} brand brand of desktop.
   * @param {string} processor processor in desktop.
   * @param {number} ram ram amount in desktop.
   * @param {number} hardDrive hardDrive size of desktop.
   * @param {number} cpuCores amount of cores in processor in desktop.
   * @param {string} dimensions dimensions of desktop.
   * @param {number} weight weight of desktop.
   * @param {number} price price of desktop.
   */
    static update(modelNumber, brand, processor, ram, hardDrive, cpuCores, dimensions, weight, price) {
        db.connect();

        let queryString = 'UPDATE desktop SET brand=$2, processor=$3, ram=$4, "hard drive"=$5, "cpu cores"=$6, dimensions=$7, weight=$8, price=$9 WHERE "modelId"=$1';
        let queryValues = [modelNumber, brand, processor, ram, hardDrive, cpuCores, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
            db.end();
        });
    }

  /**
   * Deletes an objects in the desktop table.
   * @static
   * @param {string} id model number of desktop to be deleted.
   */
    static delete(id) {
      db.connect();

      db.query('DELETE FROM desktop WHERE "modelId"=$1', [id], (err, result) =>{
          if (err) {
              console.log(err.message);
          }
          db.end();
          console.log('This Desktop has been deleted from the database');
      });
    }
}

module.exports = desktopTDG;
