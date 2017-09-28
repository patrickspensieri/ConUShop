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
   * @return tablet object.
   */
    static find(id) {
        let tablet = tabletTDG.find(id);
        return new tablet(tablet.modelNumber, tablet.brand, tablet.displaySize, tablet.processor,
            tablet.ram, tablet.hardDrive, tablet.cpuCores, tablet.os,
            tablet.battery, tablet.camera, tablet.dimensions,
            tablet.weight, tablet.price);
    }

  /**
   * Maps all returned values into objects of type tablet.
   * @static
   * @return array of tablet objects.
   */
    static findAll() {
        let tablets = [];
        let allTablets = tabletTDG.findAll();
        for (let tablet of allTablets) {
            tablets.push(new tablet(tablet.modelNumber, tablet.brand, tablet.displaySize, tablet.processor,
                tablet.ram, tablet.hardDrive, tablet.cpuCores, tablet.os,
                tablet.battery, tablet.camera, tablet.dimensions,
                tablet.weight, tablet.price));
        }
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
