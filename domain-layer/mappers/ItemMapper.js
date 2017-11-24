let Item = require('../../domain-layer/classes/Item');
let ItemTDG = require('../../data-source-layer/TDG/ItemTDG');
let AbstractMapper = require('./AbstractMapper');

/**
 * Item object mapper
 * @class ItemMapper
 * @export
 */
class ItemMapper extends AbstractMapper {
    /**
     * Creates a new item
     * @static
     * @param {string} serialNumber of product
     * @param {string} modelNumber of Product Specification
     * @param {boolean} islocked of Product Specification
     * @return {Object} item object.
     */
    static create(serialNumber, modelNumber, islocked) {
        let item = new Item(serialNumber, modelNumber, islocked);
        return item;
    }

    /**
     * Maps the returned value to an object of type Item.
     * @static
     * @param {string} serialNumber serial number of item to be found.
     * @param {function} callback function that returns item object.
     */
    static find(serialNumber, callback) {
            ItemTDG.find(serialNumber, function(err, result) {
                if (err) {
                    console.log('Error during item find query', null);
                } else {
                    let value = result[0];
                    if (result.length==0) {
                        return callback(err, null);
                    } else {
                        let item = new Item(value.serialnumber, value.model, value.islocked);
                        return callback(null, item);
                    }
                }
            });
    }

    /**
     * Maps all returned values into objects of type item.
     * @static
     * @param {function} callback function that returns desktop object.
     */
    static findAll(callback) {
        ItemTDG.findAll(function(err, result) {
            let items = [];
            if (err) {
                console.log('Error during item findAll query', null);
            } else {
                for (let value of result) {
                    let item = new Item(value.serialnumber, value.model, value.islocked);
                    items.push(item);
                }
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
        ItemTDG.insert(itemObject.serialNumber, itemObject.modelNumber, itemObject.isLocked, function(err, result) {
            if (err) {
                console.log(err);
            }
        });
    }

    /**
     * Maps an objects attributes to seperate values for TDG update method.
     * @static
     * @param {Object} itemObject an object of type item.
     */
    static update(itemObject) {
        ItemTDG.update(itemObject.serialNumber, itemObject.modelNumber, itemObject.isLocked, function(err, result) {
                if (err) {
                    console.log(err);
                }
        });
    }

    /**
     * Uses an objects serialNumber to use with TDG delete method.
     * @static
     * @param {Object} itemObject item object to delete.
     */
    static delete(itemObject) {
        ItemTDG.delete(itemObject.serialNumber, function(err, result) {
            if (err) {
                console.log(err);
            }
        });
    }

    /**
     *  Gets item from model
     * @param {*} modelNumber
     * @param {*} callback
     */
    static getItemFromModel(modelNumber, callback) {
        ItemTDG.getItemFromModel(modelNumber, function(err, result) {
            if (err) {
                return callback(err, null);
            } else {
                if (result.length <= 0) {
                    return callback('Item not available anymore', null);
                } else {
                    let value = result[0];
                    if (result.length==0) {
                        return callback(err, null);
                    } else {
                        let item = new Item(value.serialnumber, value.model, value.islocked);
                        idMap.add(item, item.serialNumber);
                        return callback(null, item);
                    }
                }
            }
        });
    }

    /**
     * Unlocks an item
     * @param {Object} object
     * @param {*} callback
     * @return {*} callback
     */
    static unlockItem(object, callback) {
        object.isLocked = false;
        UOW.registerDirty(object);
        UOW.commit();
        return callback(null, 'Success');
    }

    /**
     * Locks an item
     * @param {Object} object
     * @param {*} callback
     * @return {*} callback
     */
    static lockItem(object, callback) {
        object.isLocked = true;
        UOW.registerDirty(object);
        UOW.commit();
        return callback(null, 'Success');
    }
}

module.exports = ItemMapper;
