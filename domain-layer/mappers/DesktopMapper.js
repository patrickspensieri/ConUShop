let Desktop = require('../../domain-layer/classes/products/Desktop');
let DesktopTDG = require('../../data-source-layer/TDG/DesktopTDG');

/**
 * Desktop object mapper
 * @class DesktopMapper
 * @export
 */
class DesktopMapper {
  /**
   * Maps the returned value to an object of type desktop.
   * @static
   * @param {string} modelNumber model number of desktop to be found.
   * @return desktop object.
   */
    static find(modelNumber, callback) {
        DesktopTDG.find(modelNumber, function(err, result) {
            if (err) {
                console.log('Error during desktop find query', null);
            } else {
                let value = result[0];
                return callback(null, new Desktop(value.model, value.brand, value.processor,
                    value.ram, value.storage, value.cores, value.dimensions,
                    value.weight, value.price));
            }
        });
    }

  /**
   * Maps all returned values into objects of type desktop.
   * @static
   * @return array of desktop objects.
   */
    static findAll(callback) {
        DesktopTDG.findAll(function(err, result) {
            let desktops = [];
            if (err) {
                console.log('Error during desktop findALL query', null);
            } else {
                for (let value of result) {
                    desktops.push(new Desktop(value.model, value.brand, value.processor,
                        value.ram, value.storage, value.cores, value.dimensions,
                        value.weight, value.price));
                }
                return callback(null, desktops);
            }
        });
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} desktopObject an object of type desktop.
   */
    static insert(desktopObject) {
        DesktopTDG.insert(desktopObject.model, desktopObject.brand, desktopObject.processor,
            desktopObject.ram, desktopObject.storage, desktopObject.cores, desktopObject.dimensions,
            desktopObject.weight, desktopObject.price);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} desktopObject an object of type desktop.
   */
    static update(desktopObject) {
        DesktopTDG.update(desktopObject.model, desktopObject.brand, desktopObject.processor,
            desktopObject.ram, desktopObject.storage, desktopObject.cores, desktopObject.dimensions,
            desktopObject.weight, desktopObject.price);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} desktopObject an object of type desktop.
   */
    static delete(desktopObject) {
        DesktopTDG.delete(desktopObject.model);
    }
}

module.exports = DesktopMapper;
