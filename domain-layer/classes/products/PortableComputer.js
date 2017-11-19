let Computer = require('./Computer');

/**
 * Class describes a portable computer.
 * @class PortableComputer
 * @export
 * @extends Computer
 */
class PortableComputer extends Computer {
  /**
   * @constructor
   * @param {string} model model number of portable computer.
   * @param {string} brand brand of portable computer.
   * @param {number} display  size of portable computer screen.
   * @param {string} processor processor in portable computer.
   * @param {number} ram ram amount in portable computer.
   * @param {number} storage storage size of portable computer.
   * @param {number} cores amount of cores in processor in portable computer.
   * @param {string} os operating system of portable computer.
   * @param {string} battery battery information of portable computer.
   * @param {string} camera camera information of portable computer.
   * @param {string} dimensions dimensions of portable computer.
   * @param {number} weight weight of portable computer.
   * @param {number} price price of portable computer
   * @param {number} version version of portable computer
   */
    constructor(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price, version) {
        super(model, brand, processor, ram, storage, cores, dimensions, weight, price, version);
        this.display = display;
        this.os = os;
        this.battery = battery;
        this.camera = camera;
    }
}

module.exports = PortableComputer;
