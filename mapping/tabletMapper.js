let Tablet = require('../core/products/tablet');
let TabletTDG = require('../table-data-gateway/tabletTDG');

/**
 * Tablet object mapper
 * @class TabletMapper
 * @export
 */
class TabletMapper {
  /**
   * Maps the returned value to an object of type tablet.
   * @static
   * @param {string} id model number of tablet to be found.
   * @return tablet object.
   */
    static find(modelNumber, callback) {
        TabletTDG.find(modelNumber, function(err, result) {
            if (err) {
                console.log('Error during tablet find query', null);
            } else {
                let value = result[0];
                return callback(null, new Tablet(value.model, value.brand, value.display, value.processor,
                    value.ram, value.storage, value.cores, value.os,
                    value.battery, value.camera, value.dimensions,
                    value.weight, value.price));
            }
        });
    }

  /**
   * Maps all returned values into objects of type tablet.
   * @static
   * @return array of tablet objects.
   */
    static findAll(callback) {
        TabletTDG.findAll(function(err, result) {
            let tablets = [];
            if (err) {
                console.log('Error during tablet findALL query', null);
            } else {
                for (let value of result) {
                    tablets.push(new Tablet(value.model, value.brand, value.display, value.processor,
                        value.ram, value.storage, value.cores, value.os,
                        value.battery, value.camera, value.dimensions,
                        value.weight, value.price));
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
            tabletObject.weight, tabletObject.price);
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
            tabletObject.weight, tabletObject.price);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} tabletObject an object of type tablet.
   */
    static delete(tabletObject) {
        TabletTDG.delete(tabletObject.model);
    }
}

module.exports = TabletMapper;
