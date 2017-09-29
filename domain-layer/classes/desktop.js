let computer = require('./computer');

/**
 * Class describes a desktop.
 * @class desktop
 * @export
 * @extends computer
 */
class desktop extends computer {
    /**
     * @constructor 
     * @param {string} modelNumber model number of desktop.
     * @param {string} brand brand of desktop.
     * @param {string} processor processor in desktop.
     * @param {number} ram ram amount in desktop.
     * @param {number} hardDrive hardDrive size of desktop.
     * @param {number} cpuCores amount of cores in processor in desktop.
     * @param {string} dimensions dimensions of desktop.
     * @param {number} weight weight of desktop.
     * @param {number} price price of desktop.
     */
    constructor(modelNumber, brand, processor, ram, hardDrive, cpuCores, dimensions, weight, price) {
        super(modelNumber, brand, processor, ram, hardDrive, cpuCores, dimensions, weight, price);
    }
}

module.exports = desktop;
