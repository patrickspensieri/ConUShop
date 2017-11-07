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
    
    constructor(orderItemId, orderId, serialNumber, price, isReturned, itemObj, itemTimeout) {
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.serialNumber = serialNumber;
        this.price = price;
        this.isReturned = isReturned;
        this.itemObj = itemObj;
        this.itemTimeout = itemTimeout; //timer for each items
    }
    
    getItemObject(){
       return itemObj;
    }
}

module.exports = OrderItem;