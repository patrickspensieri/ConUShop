/**
 * Class describes a Item.
 * @class Item
 * @export
 */
class Item {
    /**
     * @constructor
     * @param {string} serialNumber of product
     * @param {string} modelNumber of Product Specification
     */
    constructor(serialNumber, modelNumber) {
        this.serialNumber = serialNumber;
        this.modelNumber = modelNumber;
    }

    /**
     * Displays information about item object.
     * To be run on an instance of item.
     * @method display
     */
    display() {
        console.log(this.serialNumber + ' ' + this.modelNumber);
    }

    /**
     * Returns serialNumber of item.
     * @method getId
     */
    getId() {
        return this.serialNumber;
    }
}

module.exports = Item;
