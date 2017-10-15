let PortableComputer = require('./portableComputer');

/**
 * Class describes a tablet.
 * @class Tablet
 * @export
 * @extends PortableComputer
 */
class Tablet extends PortableComputer {
  /**
   * @constructor
   * @param {string} model model number of tablet.
   * @param {string} brand brand of tablet.
   * @param {number} display  size of tablet screen.
   * @param {string} processor processor in tablet.
   * @param {number} ram ram amount in tablet.
   * @param {number} storage storage size of tablet.
   * @param {number} cores amount of cores in processor in tablet.
   * @param {string} os operating system of tablet.
   * @param {string} battery battery information of tablet.
   * @param {string} camera camera information of tablet.
   * @param {string} dimensions dimensions of tablet.
   * @param {number} weight weight of tablet.
   * @param {number} price price of tablet
   */
    constructor(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price) {
        super(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price);
    }
}

module.exports = Tablet;
