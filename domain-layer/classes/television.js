var electronicDevice = require('./electronicDevice');

class television extends electronicDevice {
    constructor(modelNumber, brand, weight, price, dimensions){
        super(modelNumber, brand, weight, price);
        this.dimensions = dimensions;
    }

    display() {
        console.log(this.modelNumber + " " + this.brand + " " + this.weight + " " + this.price + " " + this.dimensions);
    }
}

module.exports = television;