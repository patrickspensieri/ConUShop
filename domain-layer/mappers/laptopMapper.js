let laptop = require('../../domain-layer/classes/laptop');
let laptopTDG = require('../../data-source-layer/TDG/laptopTDG');

/**
 * laptop object mapper
 * @class laptopMapper
 * @export
 */
class laptopMapper {
  /**
   * Maps the returned value to an object of type laptop.
   * @static
   * @param {string} id model number of laptop to be found.
   */
    static find(id) {
        let laptop = laptopTDG.find(id);
        console.log(laptop);
    }

  /**
   * Maps all returned values into objects of type laptop.
   * @static
   */
    static findAll() {
        let allLaptops = laptopTDG.findAll();
        console.log(allLaptops);
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} laptopObject an object of type laptop.
   */
    static insert(laptopObject) {
        laptopTDG.insert(laptopObject.modelNumber, laptopObject.brand, laptopObject.displaySize, laptopObject.processor,
            laptopObject.ram, laptopObject.hardDrive, laptopObject.cpuCores, laptopObject.os,
            laptopObject.battery, laptopObject.camera, laptopObject.touchScreen, laptopObject.dimensions,
            laptopObject.weight, laptopObject.price);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} laptopObject an object of type laptop.
   */
    static update(laptopObject) {
        laptopTDG.update(laptopObject.modelNumber, laptopObject.brand, laptopObject.displaySize, laptopObject.processor,
            laptopObject.ram, laptopObject.hardDrive, laptopObject.cpuCores, laptopObject.os,
            laptopObject.battery, laptopObject.camera, laptopObject.touchScreen, laptopObject.dimensions,
            laptopObject.weight, laptopObject.price);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} laptopObject an object of type laptop.
   */
    static delete(laptopObject) {
            laptopTDG.delete(laptopObject.modelNumber);
    }
}

module.exports = laptopMapper;
