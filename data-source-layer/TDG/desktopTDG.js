let db = require('../db/index');

/**
 * Desktop table data gateway
 * @class DesktopTDG
 * @export
 */
class DesktopTDG {
  /**
   * Finds one object from the desktop table.
   * @static
   * @param {string} id model number of desktop to be found.
   */
    static find(id, callback) {
        db.query('SELECT * FROM desktop WHERE model=$1', [id], (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Finds all objects from the desktop table.
   * @static
   */
    static findAll(callback) {
        db.query('SELECT * FROM desktop', (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Inserts an object into the desktop table.
   * @static
   * @param {string} model model number of desktop.
   * @param {string} brand brand of desktop.
   * @param {string} processor processor in desktop.
   * @param {number} ram ram amount in desktop.
   * @param {number} storage storage size of desktop.
   * @param {number} cores amount of cores in processor in desktop.
   * @param {string} dimensions dimensions of desktop.
   * @param {number} weight weight of desktop.
   * @param {number} price price of desktop.
   */
    static insert(model, brand, processor, ram, storage, cores, dimensions, weight, price) {
        let queryString = 'INSERT INTO desktop (model, brand, processor, ram, storage, cores, dimensions, weight, price) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        let queryValues = [model, brand, processor, ram, storage, cores, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

  /**
   * Updates an object in the desktop table.
   * @static
   * @param {string} model model number of desktop.
   * @param {string} brand brand of desktop.
   * @param {string} processor processor in desktop.
   * @param {number} ram ram amount in desktop.
   * @param {number} storage storage size of desktop.
   * @param {number} cores amount of cores in processor in desktop.
   * @param {string} dimensions dimensions of desktop.
   * @param {number} weight weight of desktop.
   * @param {number} price price of desktop.
   */
    static update(model, brand, processor, ram, storage, cores, dimensions, weight, price) {
        let queryString = 'UPDATE desktop SET brand=$2, processor=$3, ram=$4, storage=$5, cores=$6, dimensions=$7, weight=$8, price=$9 WHERE model=$1';
        let queryValues = [model, brand, processor, ram, storage, cores, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

  /**
   * Deletes an objects in the desktop table.
   * @static
   * @param {string} id model number of desktop to be deleted.
   */
    static delete(id) {
      db.query('DELETE FROM desktop WHERE model=$1', [id], (err, result) =>{
          if (err) {
              console.log(err.message);
          }
          console.log('This Desktop has been deleted from the database');
      });
    }
}

module.exports = DesktopTDG;
