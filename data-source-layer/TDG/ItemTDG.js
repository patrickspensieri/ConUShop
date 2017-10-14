let db = require('../../data-source-layer/db/index');

/**
 * Item table data gateway
 * @class ItemTDG
 * @export
 */
class ItemTDG {
    /**
     * Finds one object from the Item table.
     * @static
     * @param {string} id serial number of item to be found.
     */
    static find(serialNumber) {
        db.query('SELECT * FROM item WHERE serialNumber=$1', [serialNumber], (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

    /**
     * Finds all objects from the item table.
     * @static
     */
    static findAll(callback) {
        db.query('SELECT * FROM item', (err, result) => {
            if (err) {
                console.log(err.message);
            } else {
                return callback(null, result.rows);
            }
        });
    }

    /**
     * Inserts an object into the item table.
     * @static
     * @param {string} model number of product description.
     * @param {string} serialNumber of item.

     */
    static insert(serialNumber, modelNumber) {
        let queryString = 'INSERT INTO item (serialNumber, modelNumber) VALUES($1, $2)';
        let queryValues = [model, serialNumber];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

    /**
     * Deletes an objects in the item table.
     * @static
     * @param {string} id serial number of item to be deleted.
     */
    static delete(serialNumber) {
        db.query('DELETE FROM item WHERE serialNumber=$1', [serialNumber], (err, result) =>{
            if (err) {
                console.log(err.message);
            }
            console.log('This item has been deleted from the database');
        });
    }
}

module.exports = ItemTDG;
