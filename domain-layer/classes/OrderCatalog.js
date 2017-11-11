/**
 * Class describes a OrderItem.
 * @class OrderItem
 * @export
 */
class OrderCatalog {
    /**
     * @constructor
     * @param {object} itemObj of Item
     * @param {Date} itemTimeout timer for each item
     */
    constructor(itemObj, itemTimeout) {
       this.itemObj = itemObj;
       this.itemTimeout = itemTimeout; // timer for each items
    }

    /**
     * Order getter
     * @return {Object} order item
     */
    getItemObject() {
       return itemObj;
    }
}

module.exports = OrderCatalog;
