let db = require('../db/index');

/**
 * Television table data gateway
 * @class TelevisionTDG
 * @export
 */
class TelevisionTDG {
  /**
   * Finds one object from the television table.
   * @static
   * @param {string} id model number of television to be found.
   */
    static find(id, callback) {
        db.query('SELECT * FROM television WHERE model=$1', [id], (err, result) => {
            if (err) {
                console.log(err.message);
            }
            else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Finds all objects from the television table.
   * @static
   */
    static findAll(callback) {
        db.query('SELECT * FROM television', (err, result) => {
            if (err) {
                console.log(err.message);
            }
            else {
                return callback(null, result.rows);
            }
        });
    }

  /**
   * Inserts an object into the television table.
   * @static
   * @param {string} model model number of television.
   * @param {string} brand brand of television.
   * @param {string} dimensions dimensions of television.
   * @param {number} weight weight of television.
   * @param {number} price price of television.
   */
    static insert(model, brand, dimensions, weight, price) {
        let queryString = 'INSERT INTO television (model, brand, dimensions, weight, price) VALUES($1, $2, $3, $4, $5)';
        let queryValues = [model, brand, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

  /**
   * Updates an object in the television table.
   * @static
   * @param {string} model model number of television.
   * @param {string} brand brand of television.
   * @param {string} dimensions dimensions of television.
   * @param {number} weight weight of television.
   * @param {number} price price of television
   */
    static update(model, brand, dimensions, weight, price) {
        let queryString = 'UPDATE television SET brand=$2, dimensions=$3, weight=$4, price=$5 WHERE model=$1';
        let queryValues = [model, brand, dimensions, weight, price];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

  /**
   * Deletes an objects in the television table.
   * @static
   * @param {string} id model number of television to be deleted.
   */
    static delete(id) {
      db.query('DELETE FROM television WHERE model=$1', [id], (err, result) =>{
          if (err) {
              console.log(err.message);
          }
          console.log('This television has been deleted from the database');
      });
    }
}

module.exports = TelevisionTDG;
