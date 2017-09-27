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
   * @return laptop object.
   */
    static find(id) {
        let laptop = laptopTDG.find(id);
        return new laptop(laptop.modelNumber, laptop.brand, laptop.displaySize, laptop.processor,
            laptop.ram, laptop.hardDrive, laptop.cpuCores, laptop.os,
            laptop.battery, laptop.camera, laptop.touchScreen, laptop.dimensions,
            laptop.weight, laptop.price);
    }

  /**
   * Maps all returned values into objects of type laptop.
   * @static
   * @return array of laptop objects.
   */
    static findAll() {
        let laptops = [];
        let allLaptops = laptopTDG.findAll();
        for (var laptop of allLaptops){
            laptops.push(new laptop(laptop.modelNumber, laptop.brand, laptop.displaySize, laptop.processor,
                laptop.ram, laptop.hardDrive, laptop.cpuCores, laptop.os,
                laptop.battery, laptop.camera, laptop.touchScreen, laptop.dimensions,
                laptop.weight, laptop.price));
        }
        return laptops;
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
