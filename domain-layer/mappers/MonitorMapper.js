let Monitor = require('../../domain-layer/classes/products/Monitor');
let MonitorTDG = require('../../data-source-layer/TDG/MonitorTDG');

/**
 * Monitor object mapper
 * @class MonitorMapper
 * @export
 */
class MonitorMapper {
  /**
   * Maps the returned value to an object of type monitor.
   * @static
   * @param {string} id model number of monitor to be found.
   * @return monitor object.
   */
    static find(modelNumber, callback) {
        MonitorTDG.find(modelNumber, function(err, result) {
            if (err) {
                console.log('Error during monitor find query', null);
            } else {
                let value = result[0];
                return callback(null, new Monitor(value.model, value.brand, value.size,
                    value.weight, value.price));
            }
        });
    }

  /**
   * Maps all returned values into objects of type monitor.
   * @static
   * @return array of monitor objects.
   */
    static findAll(callback) {
        MonitorTDG.findAll(function(err, result) {
            let monitors = [];
            if (err) {
                console.log('Error during monitors findALL query', null);
            } else {
                for (let value of result) {
                    monitors.push(new Monitor(value.model, value.brand, value.size,
                        value.weight, value.price));
                }
                return callback(null, monitors);
            }
        });
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} monitorObject an object of type monitor.
   */
    static insert(monitorObject) {
        MonitorTDG.insert(monitorObject.model, monitorObject.brand, monitorObject.size,
            monitorObject.weight, monitorObject.price);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} monitorObject an object of type monitor.
   */
    static update(monitorObject) {
        MonitorTDG.update(monitorObject.model, monitorObject.brand, monitorObject.size,
            monitorObject.weight, monitorObject.price);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} monitorObject an object of type monitor.
   */
    static delete(monitorObject) {
        MonitorTDG.delete(monitorObject.model);
    }
}

module.exports = MonitorMapper;
