/**
 * Class describes a Item.
 * @class Item
 * @export
 */
class Item {

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
}

module.exports = Item;
