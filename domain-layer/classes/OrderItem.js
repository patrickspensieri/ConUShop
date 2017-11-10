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
    
    constructor(orderItemId, orderId, serialNumber, price, isReturned, itemObj, itemTimeout, productCatalog) {
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.serialNumber = serialNumber;
        this.price = price;
        this.isReturned = isReturned;
        this.itemObj = itemObj;
        this.specification = null;
        this.productCatalog = productCatalog;
        this.itemTimeout = itemTimeout; //timer for each items
        
    }
    
    getOrderItemId()
    {
        return this.orderItemId;
    }

    

    getItemObject(){
       return itemObj;
    }

    setSpecification(callback) {
        let self = this;
        this.productCatalog.getProductSpecification(this.itemObj.type, this.itemObj.modelNumber, function(err, result) {
            if (!err) {
                self.specification = result;
                self.price = result.price;
            }
            return callback();
        });
    }
}

module.exports = OrderItem;