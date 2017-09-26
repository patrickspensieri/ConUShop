let portableComputer = require('./portableComputer');

/**
 * Class describes a laptop.
 * @class laptop
 * @export
 * @extends portableComputer
 */
class laptop extends portableComputer {
  /**
   * @constructor
   * @param {string} modelNumber model number of laptop.
   * @param {string} brand brand of laptop.
   * @param {number} displaySize  size of laptop screen.
   * @param {string} processor processor in laptop.
   * @param {number} ram ram amount in laptop.
   * @param {number} hardDrive hardDrive size of laptop.
   * @param {number} cpuCores amount of cores in processor in laptop.
   * @param {string} os operating system of laptop.
   * @param {string} battery battery information of laptop.
   * @param {string} camera camera information of laptop.
   * @param {boolean} touchscreen is display touchscreen or not.
   * @param {string} dimensions dimensions of laptop.
   * @param {number} weight weight of laptop.
   * @param {number} price price of laptop
   */
    constructor(modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, touchscreen, dimensions, weight, price) {
        super(modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, dimensions, weight, price);
        this.touchscreen = touchscreen;
    }

    /**
     * Displays information about laptop object. 
     * To be run on an instance of laptop.
     * @method display
     */
    display() {
        console.log(this.modelNumber + ' ' + this.brand + ' ' + this.weight + ' ' + this.price + ' ' + this.processor
        + this.ram + ' ' + this.hardDrive + ' ' + this.cpuCores + ' ' + this.dimensions + ' ' + this.display + ' '
        + this.os + ' ' + this.battery + ' ' + this.camera + ' ' + this.touchscreen);
    }
}

module.exports = laptop;
