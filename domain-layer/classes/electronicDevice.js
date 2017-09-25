class electronicDevice {
    constructor(modelNumber, brand, weight, price) {
        this.modelNumber = modelNumber;
        this.brand = brand;
        this.weight = weight;
        this.price = price;
    }

    display() {
        console.log(this.modelNumber + ' ' + this.brand + ' ' + this.weight + ' ' + this.price);
    }
}

module.exports = electronicDevice;
