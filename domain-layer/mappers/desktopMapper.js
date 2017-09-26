let desktop = require('../../domain-layer/classes/desktop');
let desktopTDG = require('../../data-source-layer/TDG/desktopTDG');

/**
 * Desktop object mapper
 * @class desktopMapper
 * @export
 */
class desktopMapper {
  /**
   * Maps the returned value to an object of type desktop.
   * @static
   * @param {string} id model number of desktop to be found.
   */
    static find(id) {
        let desktop = desktopTDG.find(id);
        console.log(desktop);
    }

  /**
   * Maps all returned values into objects of type desktop.
   * @static
   */
    static findAll() {
        // let desktops = [];
        let allDesktops = desktopTDG.findAll();
        console.log(allDesktops);
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} desktopObject an object of type desktop.
   */
    static insert(desktopObject) {
        desktopTDG.insert(desktopObject.modelNumber, desktopObject.brand, desktopObject.processor,
            desktopObject.ram, desktopObject.hardDrive, desktopObject.cpuCores, desktopObject.dimensions,
            desktopObject.weight, desktopObject.price);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} desktopObject an object of type desktop.
   */
    static update(desktopObject) {
        desktopTDG.update(desktopObject.modelNumber, desktopObject.brand, desktopObject.processor,
            desktopObject.ram, desktopObject.hardDrive, desktopObject.cpuCores, desktopObject.dimensions,
            desktopObject.weight, desktopObject.price);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} desktopObject an object of type desktop.
   */
    static delete(desktopObject) {
        desktopTDG.delete(desktopObject.modelNumber);
    }
}

module.exports = desktopMapper;
