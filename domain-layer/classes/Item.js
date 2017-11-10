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
    constructor(serialNumber, modelNumber, isLocked) {
        this.serialNumber = serialNumber;
        this.modelNumber = modelNumber;
        this.isLocked = isLocked;
        this.type = null;
        this.price = null;
    }

    setPrice(price) {
        this.price = price;
    }
}

module.exports = Item;
