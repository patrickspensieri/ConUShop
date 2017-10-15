/**
 * Class describes a Item.
 * @class Item
 * @export
 */
class Item {
    /**
     * @constructor
     * @param {string} serialNumber of product
     * @param {string} productType of product
     * @param {string} modelNumber of Product Specification
     */
    constructor(serialNumber, productType,  modelNumber) {
        this.serialNumber = serialNumber;
        this.productType = productType;
        this.modelNumber = modelNumber;
    }

    /**
     * Displays information about item object.
     * To be run on an instance of item.
     * @method display
     */
    display() {
        console.log(this.serialNumber + ' ' + this.productType + ' ' + this.modelNumber);
    }
}

module.exports = Item;
