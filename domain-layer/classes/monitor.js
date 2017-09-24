var electronicDevice = require('./electronicDevice');

class monitor extends electronicDevice {
    constructor(modelNumber, brand, weight, price, displaySize){
        super(modelNumber, brand, weight, price);
        this.displaySize = displaySize;
    }

    display() {
        console.log(this.modelNumber + " " + this.brand + " " + this.weight + " " + this.price + " " + this.displaySize);
    }
}

module.exports = monitor;