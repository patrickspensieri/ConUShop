/**
 * Class describes a OrderItem.
 * @class OrderItem
 * @export
 */

class OrderItem {
    /**
     * @constructor
     * @param {object} Instance of Item
     * @param {int} Quantity of Item
     */
    
    constructor(itemObj, quantity) {
       this.itemObj = itemObj;
       this.quantity = quantity;
    }
    
    getQuantity() {
       return quantity;
    }
    
    getItemObject(){
       return itemObj;
    }
}

module.exports = OrderItem;