let ElectronicDevice = require('./ElectronicDevice');

/**
 * Class describes a television.
 * @class Television
 * @export
 * @extends ElectronicDevice
 */
class Television extends ElectronicDevice {
  /**
   * @constructor
   * @param {string} model model number of television.
   * @param {string} brand brand of television.
   * @param {string} dimensions dimensions of television.
   * @param {number} weight weight of television.
   * @param {number} price price of television.
   */
    constructor(model, brand, dimensions, weight, price) {
        super(model, brand, weight, price);
        this.dimensions = dimensions;
    }

    /**
     * Displays information about television object. 
     * To be run on an instance of television.
     * @method display
     */
    display() {
        console.log(this.model + ' ' + this.brand + ' ' + this.weight + ' ' + this.price + ' ' + this.dimensions);
    }
}

module.exports = Television;
