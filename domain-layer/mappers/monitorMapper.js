let monitor = require('../../domain-layer/classes/monitor');
let monitorTDG = require('../../data-source-layer/TDG/monitorTDG');

/**
 * monitor object mapper
 * @class monitorMapper
 * @export
 */
class monitorMapper {
  /**
   * Maps the returned value to an object of type monitor.
   * @static
   * @param {string} id model number of monitor to be found.
   * @return monitor object.
   */
    static find(id) {
        let monitor = monitorTDG.find(id);
        return new monitor(monitor.modelNumber, monitor.brand, monitor.size,
            monitor.weight, monitor.price);
    }

  /**
   * Maps all returned values into objects of type monitor.
   * @static
   * @return array of monitor objects.
   */
    static findAll() {
        let monitors = [];
        let allmonitors = monitorTDG.findAll();
        for (var monitor of allMonitors){
            monitors.push(new monitor(monitor.modelNumber, monitor.brand, monitor.size,
                monitor.weight, monitor.price));
        }
        return monitors;
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} monitorObject an object of type monitor.
   */
    static insert(monitorObject) {
        monitorTDG.insert(monitorObject.modelNumber, monitorObject.brand, monitorObject.size,
            monitorObject.weight, monitorObject.price);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} monitorObject an object of type monitor.
   */
    static update(monitorObject) {
        monitorTDG.update(monitorObject.modelNumber, monitorObject.brand, monitorObject.size,
            monitorObject.weight, monitorObject.price);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} monitorObject an object of type monitor.
   */
    static delete(monitorObject) {
        monitorTDG.delete(monitorObject.modelNumber);
    }
}

module.exports = monitorMapper;
