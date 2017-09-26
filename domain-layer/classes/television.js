let electronicDevice = require('./electronicDevice');

/**
 * Class describes a television.
 * @class television
 * @export
 * @extends electronicDevice
 */
class television extends electronicDevice {
  /**
   * @constructor
   * @param {string} modelNumber model number of television.
   * @param {string} brand brand of television.
   * @param {string} dimensions dimensions of television.
   * @param {number} weight weight of television.
   * @param {number} price price of television.
   */
    constructor(modelNumber, brand, dimensions, weight, price) {
        super(modelNumber, brand, weight, price);
        this.dimensions = dimensions;
    }

    /**
     * Displays information about television object. 
     * To be run on an instance of television.
     * @method display
     */
    display() {
        console.log(this.modelNumber + ' ' + this.brand + ' ' + this.weight + ' ' + this.price + ' ' + this.dimensions);
    }
}

module.exports = television;
