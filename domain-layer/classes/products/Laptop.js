let PortableComputer = require('./portableComputer');

/**
 * Class describes a laptop.
 * @class Laptop
 * @export
 * @extends PortableComputer
 */
class Laptop extends PortableComputer {
  /**
   * @constructor
   * @param {string} model model number of laptop.
   * @param {string} brand brand of laptop.
   * @param {number} display  size of laptop screen.
   * @param {string} processor processor in laptop.
   * @param {number} ram ram amount in laptop.
   * @param {number} storage storage size of laptop.
   * @param {number} cores amount of cores in processor in laptop.
   * @param {string} os operating system of laptop.
   * @param {string} battery battery information of laptop.
   * @param {string} camera camera information of laptop.
   * @param {boolean} touch is display touch or not.
   * @param {string} dimensions dimensions of laptop.
   * @param {number} weight weight of laptop.
   * @param {number} price price of laptop
   */
    constructor(model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight, price) {
        super(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price);
        this.touch = touch;
    }

    /**
     * Displays information about laptop object. 
     * To be run on an instance of laptop.
     * @method display
     */
    display() {
        console.log(this.model + ' ' + this.brand + ' ' + this.weight + ' ' + this.price + ' ' + this.processor
        + this.ram + ' ' + this.storage + ' ' + this.cores + ' ' + this.dimensions + ' ' + this.display + ' '
        + this.os + ' ' + this.battery + ' ' + this.camera + ' ' + this.touch);
    }
}

module.exports = Laptop;
