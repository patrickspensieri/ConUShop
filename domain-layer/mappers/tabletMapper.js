let tablet = require('../../domain-layer/classes/tablet');
let tabletTDG = require('../../data-source-layer/TDG/tabletTDG');

/**
 * tablet object mapper
 * @class tabletMapper
 * @export
 */
class tabletMapper {
  /**
   * Maps the returned value to an object of type tablet.
   * @static
   * @param {string} id model number of tablet to be found.
   */
    static find(id) {
        let tablet = tabletTDG.find(id);
        console.log(tablet);
    }

  /**
   * Maps all returned values into objects of type tablet.
   * @static
   */
    static findAll() {
        let allTablets = tabletTDG.findAll();
        console.log(allTablets);
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} tabletObject an object of type tablet.
   */
    static insert(tabletObject) {
        TDG.insert(tabletObject.modelNumber, tabletObject.brand, tabletObject.displaySize, tabletObject.processor,
            tabletObject.ram, tabletObject.hardDrive, tabletObject.cpuCores, tabletObject.os,
            tabletObject.battery, tabletObject.camera, tabletObject.dimensions,
            tabletObject.weight, tabletObject.price);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} tabletObject an object of type tablet.
   */
    static update(tabletObject) {
        tabletTDG.update(tabletObject.modelNumber, tabletObject.brand, tabletObject.displaySize, tabletObject.processor,
            tabletObject.ram, tabletObject.hardDrive, tabletObject.cpuCores, tabletObject.os,
            tabletObject.battery, tabletObject.camera, tabletObject.dimensions,
            tabletObject.weight, tabletObject.price);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} tabletObject an object of type tablet.
   */
    static delete(tabletObject) {
                    tabletTDG.delete(tabletObject.modelNumber);
    }
}

module.exports = tabletMapper;
