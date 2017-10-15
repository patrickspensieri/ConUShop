let Item = require('../../domain-layer/classes/Item');
let ItemTDG = require('../../data-source-layer/TDG/ItemTDG');

/**
 * Item object mapper
 * @class ItemMapper
 * @export
 */
class ItemMapper {
    /**
     * Maps the returned value to an object of type Item.
     * @static
     * @param {string} id serial number of item to be found.
     * @return item object.
     */
    static find(serialNumber, callback) {
        ItemTDG.find(serialNumber, function(err, result) {
            if (err) {
                console.log('Error during item find query', null);
            } else {
                let value = result[0];
                return callback(null, new Item(value.serialNumber, value.modelNumber));
            }
        });
    }

    /**
     * Maps all returned values into objects of type item.
     * @static
     * @return array of item objects.
     */
    static findAll(callback) {
        ItemTDG.findAll(function(err, result) {
            let items = [];
            if (err) {
                console.log('Error during item findAll query', null);
            } else {
                for (let value of result) {
                    items.push(new Item(value.serialnumber, value.modelnumber));
                }
                console.log(items);
                return callback(null, items);
            }
        });
    }

    /**
     * Maps an objects attributes to seperate values for TDG insert method.
     * @static
     * @param {Object} itemObject an object of type item.
     */
    static insert(itemObject) {
        console.log(itemObject.serialNumber);
        console.log(itemObject.modelNumber);
        ItemTDG.insert(itemObject.serialNumber, itemObject.modelNumber);
    }

    /**
     * Extracts an objects id to use with TDG delete method.
     * @static
     * @param {Object} itemObject an object of type item.
     */
    static delete(serialNumber) {
        ItemTDG.delete(serialNumber);
    }
}

module.exports = ItemMapper;
