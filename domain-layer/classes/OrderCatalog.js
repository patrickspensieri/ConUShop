/**
 * Class describes a OrderItem.
 * @class OrderItem
 * @export
 */

class OrderCatalog {
    /**
     * @constructor
     * @param {object} Instance of Item
     * @param {int} Quantity of Item
     */
    
    constructor(itemObj, itemTimeout) {
       this.itemObj = itemObj;
       this.itemTimeout = itemTimeout; //timer for each items
    }
    
    getItemObject(){
       return itemObj;
    }
}

module.exports = OrderCatalog;