let computer = require('./computer');

/**
 * Class describes a portable computer.
 * @class portableComputer
 * @export
 * @extends computer
 */
class portableComputer extends computer {
  /**
   * @constructor
   * @param {string} modelNumber model number of portable computer.
   * @param {string} brand brand of portable computer.
   * @param {number} displaySize  size of portable computer screen.
   * @param {string} processor processor in portable computer.
   * @param {number} ram ram amount in portable computer.
   * @param {number} hardDrive hardDrive size of portable computer.
   * @param {number} cpuCores amount of cores in processor in portable computer.
   * @param {string} os operating system of portable computer.
   * @param {string} battery battery information of portable computer.
   * @param {string} camera camera information of portable computer.
   * @param {string} dimensions dimensions of portable computer.
   * @param {number} weight weight of portable computer.
   * @param {number} price price of portable computer
   */
    constructor(modelNumber, brand, displaySize, processor, ram, hardDrive, cpuCores, os, battery, camera, dimensions, weight, price) {
        super(modelNumber, brand, processor, ram, hardDrive, cpuCores, dimensions, weight, price);
        this.displaySize = displaySize;
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
        console.log(this.modelNumber + ' ' + this.brand + ' ' + this.weight + ' ' + this.price + ' ' + this.processor
        + this.ram + ' ' + this.hardDrive + ' ' + this.cpuCores + ' ' + this.dimensions + ' ' + this.display + ' '
        + this.os + ' ' + this.battery + ' ' + this.camera);
    }
}

module.exports = portableComputer;
