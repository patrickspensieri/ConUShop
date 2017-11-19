let TabletTDG = require('../../data-source-layer/TDG/TabletTDG');
let Tablet = require('../../domain-layer/classes/products/Tablet');
let AbstractMapper = require('./AbstractMapper');

/**
 * Tablet object mapper
 * @class TabletMapper
 * @export
 */
class TabletMapper extends AbstractMapper {
  /**
   * Creates a new tablet
   * @static
   * @param {string} model model number of tablet.
   * @param {string} brand brand of tablet.
   * @param {number} display  size of tablet screen.
   * @param {string} processor processor in tablet.
   * @param {number} ram ram amount in tablet.
   * @param {number} storage storage size of tablet.
   * @param {number} cores amount of cores in processor in tablet.
   * @param {string} os operating system of tablet.
   * @param {string} battery battery information of tablet.
   * @param {string} camera camera information of tablet.
   * @param {string} dimensions dimensions of tablet.
   * @param {number} weight weight of tablet.
   * @param {number} price price of tablet
   * @param {number} version version of tablet
   * @return {tablet} tablet object.
   */
    static create(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price, version) {
        let tablet = new Tablet(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price, version);
        return tablet;
    }

  /**
   * Maps the returned value to an object of type tablet.
   * @static
   * @param {string} modelNumber model number of tablet to be found.
   * @param {function} callback function that holds Tablet object.
   * @return {function} callback object
   */
    static find(modelNumber, callback) {
        let tablet = idMap.get('Tablet', modelNumber);
        if (tablet != null) {
            return callback(null, tablet);
        } else {
            TabletTDG.find(modelNumber, function(err, result) {
                if (err) {
                    console.log('Error during tablet find query', null);
                } else {
                    let value = result[0];
                    if (result.length==0) {
                        return callback(err, null);
                    } else {
                        let tablet = new Tablet(value.model, value.brand, value.display, value.processor,
                            value.ram, value.storage, value.cores, value.os,
                            value.battery, value.camera, value.dimensions,
                            value.weight, value.price, value.version);
                        idMap.add(tablet, tablet.model);
                        return callback(null, tablet);
                    }
                }
            });
        }
    }

  /**
   * Maps all returned values into objects of type tablet.
   * @static
   * @param {function} callback function that holds array of Tablet object.
   */
    static findAll(callback) {
        TabletTDG.findAll(function(err, result) {
            let tablets = [];
            if (err) {
                console.log('Error during tablet findALL query', null);
            } else {
                for (let value of result) {
                    let tablet = new Tablet(value.model, value.brand, value.display, value.processor,
                        value.ram, value.storage, value.cores, value.os,
                        value.battery, value.camera, value.dimensions,
                        value.weight, value.price);
                    tablets.push(tablet);
                    if (idMap.get('Tablet', tablet.model) == null) {
                        idMap.add(tablet, tablet.model);
                    }
                }
                return callback(null, tablets);
            }
        });
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} tabletObject an object of type tablet.
   */
    static insert(tabletObject) {
        TabletTDG.insert(tabletObject.model, tabletObject.brand, tabletObject.display, tabletObject.processor,
            tabletObject.ram, tabletObject.storage, tabletObject.cores, tabletObject.os,
            tabletObject.battery, tabletObject.camera, tabletObject.dimensions,
            tabletObject.weight, tabletObject.price, function(err, result) {
                if (!err) {
                    idMap.add(tabletObject, tabletObject.model);
                }
            });
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} tabletObject an object of type tablet.
   */
    static update(tabletObject) {
        TabletTDG.update(tabletObject.model, tabletObject.brand, tabletObject.display, tabletObject.processor,
            tabletObject.ram, tabletObject.storage, tabletObject.cores, tabletObject.os,
            tabletObject.battery, tabletObject.camera, tabletObject.dimensions,
            tabletObject.weight, tabletObject.price, tabletObject.version, function(err, result) {
                if (!err) {
                    idMap.update(tabletObject, tabletObject.model);
                }
            });
    }

  /**
   * Extracts an objects model to use with TDG delete method.
   * @static
   * @param {Object} tabletObject an object of type tablet.
   */
    static delete(tabletObject) {
        TabletTDG.delete(tabletObject.model, function(err, result) {
            if (!err) {
                idMap.delete(tabletObject, tabletObject.model);
            }
        });
    }

    /**
     * Retuns a tablet object
     * @param {function} callback 
     */
    static getTablet(callback) {
        TabletTDG.getTablet(function(err, result) {
            let tablet = [];
            if (err) {
                console.log('Error during getTablet query', null);
            } else {
                for (let value of result) {
                    tablet.push(new Tablet(value.model, value.brand, value.display, value.processor, value.ram, value.storage, value.cores, value.os, value.battery, value.camera, value.dimensions, value.weight, value.price, value.version));
                }
                return callback(null, tablet);
            }
        });
    }
}

module.exports = TabletMapper;
