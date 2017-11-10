let ElectronicDevice = require('./ElectronicDevice');

/**
 * Class describes a computer.
 * @class Computer
 * @export
 * @extends ElectronicDevice
 */
class Computer extends ElectronicDevice {
    /**
     * @constructor 
     * @param {string} model model number of computer.
     * @param {string} brand brand of computer.
     * @param {string} processor processor in computer.
     * @param {number} ram ram amount in computer.
     * @param {number} storage storage size of computer.
     * @param {number} cores amount of cores in processor in computer.
     * @param {string} dimensions dimensions of computer.
     * @param {number} weight weight of computer.
     * @param {number} price price of computer.
     */
    constructor(model, brand, processor, ram, storage, cores, dimensions, weight, price) {
        super(model, brand, weight, price);
        this.processor = processor;
        this.ram = ram;
        this.storage = storage;
        this.cores = cores;
        this.dimensions = dimensions;
    }
}

module.exports = Computer;
