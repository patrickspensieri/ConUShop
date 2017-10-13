let Computer = require('./computer');

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
   */
    constructor(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price) {
        super(model, brand, processor, ram, storage, cores, dimensions, weight, price);
        this.display = display;
        this.os = os;
        this.battery = battery;
        this.camera = camera;
    }

     /**
     * Displays information about portable computer object. 
     * To be run on an instance of portable computer.
     * @method display
     */
    display() {
        console.log(this.model + ' ' + this.brand + ' ' + this.weight + ' ' + this.price + ' ' + this.processor
        + this.ram + ' ' + this.storage + ' ' + this.cores + ' ' + this.dimensions + ' ' + this.display + ' '
        + this.os + ' ' + this.battery + ' ' + this.camera);
    }
}

module.exports = PortableComputer;
