var electronicDevice = require('./electronicDevice.js');

class computer extends electronicDevice {
    constructor(modelNumber, brand, weight, price, processor, ram, hardDrive, cpuCores, dimensions){
        super(modelNumber, brand, weight, price);
        this.processor = processor;
        this.ram = ram;
        this.hardDrive = hardDrive;
        this.cpuCores = cpuCores;
        this.dimensions = dimensions;
    }

    display() {
        console.log(this.modelNumber + " " + this.brand + " " + this.weight + " " + this.price + " " + this.processor
        + this.ram + " " + this.hardDrive + " " + this.cpuCores + " " + this.dimensions);
    }
}

module.exports = computer;