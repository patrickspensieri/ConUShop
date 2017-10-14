let Laptop = require('../core/products/laptop');
let LaptopTDG = require('../table-data-gateway/laptopTDG');

/**
 * Laptop object mapper
 * @class LaptopMapper
 * @export
 */
class LaptopMapper {
  /**
   * Maps the returned value to an object of type laptop.
   * @static
   * @param {string} id model number of laptop to be found.
   * @return laptop object.
   */
    static find(modelNumber, callback) {
        LaptopTDG.find(modelNumber, function(err, result) {
            if (err) {
                console.log('Error during laptop find query', null);
            } else {
                let value = result[0];
                return callback(null, new Laptop(value.model, value.brand, value.display, value.processor,
                    value.ram, value.storage, value.cores, value.os,
                    value.battery, value.camera, value.touch, value.dimensions,
                    value.weight, value.price));
            }
        });
    }

  /**
   * Maps all returned values into objects of type laptop.
   * @static
   * @return array of laptop objects.
   */
    static findAll(callback) {
        LaptopTDG.findAll(function(err, result) {
            let laptops = [];
            if (err) {
                console.log('Error during laptop findAll query', null);
            } else {
                for (let value of result) {
                    laptops.push(new Laptop(value.model, value.brand, value.display, value.processor,
                        value.ram, value.storage, value.cores, value.os,
                        value.battery, value.camera, value.touch, value.dimensions,
                        value.weight, value.price));
                }
                return callback(null, laptops);
            }
        });
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} laptopObject an object of type laptop.
   */
    static insert(laptopObject) {
        LaptopTDG.insert(laptopObject.model, laptopObject.brand, laptopObject.display, laptopObject.processor,
            laptopObject.ram, laptopObject.storage, laptopObject.cores, laptopObject.os,
            laptopObject.battery, laptopObject.camera, laptopObject.touch, laptopObject.dimensions,
            laptopObject.weight, laptopObject.price);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} laptopObject an object of type laptop.
   */
    static update(laptopObject) {
        LaptopTDG.update(laptopObject.model, laptopObject.brand, laptopObject.display, laptopObject.processor,
            laptopObject.ram, laptopObject.storage, laptopObject.cores, laptopObject.os,
            laptopObject.battery, laptopObject.camera, laptopObject.touch, laptopObject.dimensions,
            laptopObject.weight, laptopObject.price);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} laptopObject an object of type laptop.
   */
    static delete(laptopObject) {
            LaptopTDG.delete(laptopObject.model);
    }
}

module.exports = LaptopMapper;
