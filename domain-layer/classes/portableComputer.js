var computer = require('./computer.js');

class portableComputer extends computer {
    constructor(modelNumber, brand, weight, price, processor, ram, hardDrive, cpuCores, dimensions, displaySize, os, battery, camera) {
        super(modelNumber, brand, weight, price, processor, ram, hardDrive, cpuCores, dimensions)
        this.displaySize = displaySize;
        this.os = os;
        this.battery = battery;
        this.camera = camera;
    }

    display() {
        console.log(this.modelNumber + " " + this.brand + " " + this.weight + " " + this.price + " " + this.processor
        + this.ram + " " + this.hardDrive + " " + this.cpuCores + " " + this.dimensions + " " + this.display + " "
        + this.os + " " + this.battery + " " + this.camera);
    }
}

module.exports = portableComputer;