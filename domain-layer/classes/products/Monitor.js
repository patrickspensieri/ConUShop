let ElectronicDevice = require('./ElectronicDevice');

/**
 * Class describes a monitor.
 * @class Monitor
 * @export
 * @extends ElectronicDevice
 */
class Monitor extends ElectronicDevice {
  /**
   * @constructor
   * @param {string} model model number of monitor.
   * @param {string} brand brand of monitor.
   * @param {number} size  size of monitor screen.
   * @param {number} weight weight of monitor.
   * @param {number} price price of monitor.
   * @param {number} version version of monitor
   */
    constructor(model, brand, size, weight, price, version) {
        super(model, brand, weight, price, version);
        this.size = size;
    }
}

module.exports = Monitor;
