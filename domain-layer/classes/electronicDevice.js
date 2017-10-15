/**
 * Class describes an electronic device.
 * @class ElectronicDevice
 * @export
 */
class ElectronicDevice {
    /**
     * @constructor 
     * @param {string} model model number of electronic device.
     * @param {string} brand brand of electronic device.
     * @param {number} weight weight of electronic device.
     * @param {number} price price of electronic device.
     */
    constructor(model, brand, weight, price) {
        this.model = model;
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
        console.log(this.model + ' ' + this.brand + ' ' + this.weight + ' ' + this.price);
    }
}

module.exports = ElectronicDevice;
