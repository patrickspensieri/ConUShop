let ElectronicDevice = require('./electronicDevice');

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
   */
    constructor(model, brand, size, weight, price) {
        super(model, brand, weight, price);
        this.size = size;
    }

    /**
     * Displays information about monitor object. 
     * To be run on an instance of monitor.
     * @method display
     */
    display() {
        console.log(this.model + ' ' + this.brand + ' ' + this.weight + ' ' + this.price + ' ' + this.display);
    }
}

module.exports = Monitor;
