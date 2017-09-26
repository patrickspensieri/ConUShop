let electronicDevice = require('./electronicDevice');

/**
 * Class describes a monitor.
 * @class monitor
 * @export
 * @extends electronicDevice
 */
class monitor extends electronicDevice {
  /**
   * @constructor
   * @param {string} modelNumber model number of monitor.
   * @param {string} brand brand of monitor.
   * @param {number} size  size of monitor screen.
   * @param {number} weight weight of monitor.
   * @param {number} price price of monitor.
   */
    constructor(modelNumber, brand, size, weight, price) {
        super(modelNumber, brand, weight, price);
        this.size = size;
    }

    /**
     * Displays information about monitor object. 
     * To be run on an instance of monitor.
     * @method display
     */
    display() {
        console.log(this.modelNumber + ' ' + this.brand + ' ' + this.weight + ' ' + this.price + ' ' + this.displaySize);
    }
}

module.exports = monitor;
