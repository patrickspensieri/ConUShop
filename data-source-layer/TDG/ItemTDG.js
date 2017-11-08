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
     * @param {function} callback function
     */
    static find(serialNumber, callback) {
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
     * @param {function} callback function
     */
    static insert(serialNumber, modelNumber, callback) {
        let queryString = 'INSERT INTO item (serialnumber, model) VALUES($1, $2)';
        let queryValues = [serialNumber, modelNumber];

        db.query(queryString, queryValues, (err, result) =>{
            if (err) {
                console.log(err.message);
            }
            return callback(err, result);
        });
    }

    /**
     * Deletes an objects in the item table.
     * @static
     * @param {string} serialNumber serial number of item to be deleted.
     * @param {function} callback function
     */
    static delete(serialNumber, callback) {
        db.query('DELETE FROM item WHERE serialnumber=$1', [serialNumber], (err, result) =>{
            if (err) {
                console.log(err.message);
            }
            console.log('This item has been deleted from the database');
            return callback(err, result);
        });
    }

    static getItemFromModel(modelNumber, callback) {
        db.query('SELECT * FROM item WHERE model=$1 AND islocked=false LIMIT 1', [modelNumber], (err, result) =>{
            if (err) {
                console.log(err.message);
            }
            return callback(err, result.rows);
        });
    }

    static unlockItem(serialNumber, callback) {
        db.query('UPDATE item SET islocked=false WHERE serialnumber=$1', [serialNumber], (err, result) =>{
            if (err) {
                console.log(err.message);
            }
            return callback(err, result);
        });
    }

    static lockItem(serialNumber, callback) {
        db.query('UPDATE item SET islocked=true WHERE serialnumber=$1', [serialNumber], (err, result) =>{
            if (err) {
                console.log(err.message);
            }
            return callback(err, result);
        });
    }

}

module.exports = ItemTDG;
