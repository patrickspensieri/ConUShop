/**
 * Class describes an electronic device.
 * @class electronicDevice
 * @export
 */
class electronicDevice {
    /**
     * @constructor 
     * @param {string} modelNumber model number of electronic device.
     * @param {string} brand brand of electronic device.
     * @param {number} weight weight of electronic device.
     * @param {number} price price of electronic device.
     */
    constructor(modelNumber, brand, weight, price) {
        this.modelNumber = modelNumber;
        this.brand = brand;
        this.weight = weight;
        this.price = price;
    }

    /**
     * Displays information about electronic device object. 
     * To be run on an instance of electronic device.
     * @method display
     */
    display() {
        console.log(this.modelNumber + ' ' + this.brand + ' ' + this.weight + ' ' + this.price);
    }
}

module.exports = electronicDevice;
