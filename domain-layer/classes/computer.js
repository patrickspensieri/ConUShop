let electronicDevice = require('./electronicDevice');

/**
 * Class describes a computer.
 * @class computer
 * @export
 * @extends electronicDevice
 */
class computer extends electronicDevice {
    /**
     * @constructor 
     * @param {string} modelNumber model number of computer.
     * @param {string} brand brand of computer.
     * @param {string} processor processor in computer.
     * @param {number} ram ram amount in computer.
     * @param {number} hardDrive hardDrive size of computer.
     * @param {number} cpuCores amount of cores in processor in computer.
     * @param {string} dimensions dimensions of computer.
     * @param {number} weight weight of computer.
     * @param {number} price price of computer.
     */
    constructor(modelNumber, brand, processor, ram, hardDrive, cpuCores, dimensions, weight, price) {
        super(modelNumber, brand, weight, price);
        this.processor = processor;
        this.ram = ram;
        this.hardDrive = hardDrive;
        this.cpuCores = cpuCores;
        this.dimensions = dimensions;
    }

    /**
     * Displays information about computer object. 
     * To be run on an instance of computer.
     * @method display
     */
    display() {
        console.log(this.modelNumber + ' ' + this.brand + ' ' + this.weight + ' ' + this.price + ' ' + this.processor
        + this.ram + ' ' + this.hardDrive + ' ' + this.cpuCores + ' ' + this.dimensions);
    }
}

module.exports = computer;
