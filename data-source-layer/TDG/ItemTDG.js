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
     * @param {string} serialNumber serial number of item to be found.
     */
    static find(serialNumber) {
        db.query('SELECT * FROM item WHERE serialnumber=$1', [serialNumber], (err, result) => {
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
     * @param {function} callback function
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
     * @param {string} serialNumber number of product.
     * @param {string} modelNumber of product description.

     */
    static insert(serialNumber, modelNumber) {
        let queryString = 'INSERT INTO item (serialnumber, modelnumber) VALUES($1, $2)';
        let queryValues = [serialNumber, modelNumber];

        db.query(queryString, queryValues, (err, result) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

    /**
     * Deletes an objects in the item table.
     * @static
     * @param {string} serialNumber serial number of item to be deleted.
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
