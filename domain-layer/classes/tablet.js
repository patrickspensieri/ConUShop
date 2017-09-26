let portableComputer = require('./portableComputer');

/**
 * Class describes a tablet.
 * @class tablet
 * @export
 * @extends portableComputer
 */
class tablet extends portableComputer {
  /**
   * @constructor
   * @param {string} modelNumber model number of tablet.
   * @param {string} brand brand of tablet.
   * @param {number} displaySize  size of tablet screen.
   * @param {string} processor processor in tablet.
   * @param {number} ram ram amount in tablet.
   * @param {number} hardDrive hardDrive size of tablet.
   * @param {number} cpuCores amount of cores in processor in tablet.
   * @param {string} os operating system of tablet.
   * @param {string} battery battery information of tablet.
   * @param {string} camera camera information of tablet.
   * @param {string} dimensions dimensions of tablet.
   * @param {number} weight weight of tablet.
   * @param {number} price price of tablet
   */
    constructor(modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, dimensions, weight, price) {
        super(modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, dimensions, weight, price);
    }
}

module.exports = tablet;
