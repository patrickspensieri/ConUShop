let MonitorTDG = require('../../data-source-layer/TDG/MonitorTDG');
let Monitor = require('../../domain-layer/classes/products/Monitor');

/**
 * Monitor object mapper
 * @class MonitorMapper
 * @export
 */
class MonitorMapper {
  /**
   * Creates a new monitor
   * @static
   * @param {string} model model number of monitor.
   * @param {string} brand brand of monitor.
   * @param {number} size  size of monitor screen.
   * @param {number} weight weight of monitor.
   * @param {number} price price of monitor.
   * @return {monitor} monitor object.
   */
    static makeNew(model, brand, size, weight, price) {
        let monitor = new Monitor(model, brand, size, weight, price);
        UOW.registerNew(monitor);
        return monitor;
    }


  /**
   * Registers an object dirty in the UOW
   * @static
   * @param {Object} monitor an object of type monitor.
   */
    static makeUpdate(monitor) {
        UOW.registerDirty(monitor);
    }

  /**
    * Registers an object deleted in the UOW
    * @static
    * @param {Object} monitor an object of type monitor.
    */
    static makeDeletion(monitor) {
        UOW.registerDeleted(monitor);
    }

  /**
    * Commits the UOW
    * @static
    */
    static commit() {
        UOW.commit();
    }

  /**
   * Maps the returned value to an object of type monitor.
   * @static
   * @param {string} modelNumber model number of monitor to be found.
   * @param {function} callback function that holds monitor object
   */
    static find(modelNumber, callback) {
        MonitorTDG.find(modelNumber, function(err, result) {
            if (err) {
                console.log('Error during monitor find query', null);
            } else {
                let value = result[0];
                if (result.length==0) {
                    return callback(err, null);
                } else {
                    return callback(null, new Monitor(value.model, value.brand, value.size,
                        value.weight, value.price));
                }
            }
        });
    }

  /**
   * Maps all returned values into objects of type monitor.
   * @static
   * @param {function} callback function that holds array of monitor object
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
   * Extracts an objects model to use with TDG delete method.
   * @static
   * @param {Object} monitorObject an object of type monitor.
   */
    static delete(monitorObject) {
        MonitorTDG.delete(monitorObject.model);
    }
}

module.exports = MonitorMapper;
