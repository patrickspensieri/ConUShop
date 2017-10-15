let Computer = require('./computer');

/**
 * Class describes a desktop.
 * @class Desktop
 * @export
 * @extends Computer
 */
class Desktop extends Computer {
    /**
     * @constructor 
     * @param {string} model model number of desktop.
     * @param {string} brand brand of desktop.
     * @param {string} processor processor in desktop.
     * @param {number} ram ram amount in desktop.
     * @param {number} storage storage size of desktop.
     * @param {number} cores amount of cores in processor in desktop.
     * @param {string} dimensions dimensions of desktop.
     * @param {number} weight weight of desktop.
     * @param {number} price price of desktop.
     */
    constructor(model, brand, processor, ram, storage, cores, dimensions, weight, price) {
        super(model, brand, processor, ram, storage, cores, dimensions, weight, price);
    }
}

module.exports = Desktop;
