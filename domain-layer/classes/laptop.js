var portableComputer = require('./portableComputer.js');

//JS class for laptops
class laptop extends portableComputer {

    laptop.numInstances = (laptop.numInstances || 0) + 1; // not tested yet

    constructor(modelNumber, brand, weight, price, processor, ram, hardDrive, cpuCores, dimensions, displaySize, os, battery, camera, touchscreen){
        //should inherited from electronicDevice
        modelnum = super.modelnumMethod() // (This method is located in parent electronicDevice, it must evaluate the instance of the class and determine the number of laptops;);
        super(modelNumber, brand, weight, price, processor, ram, hardDrive, cpuCores, dimensions, displaySize, os, battery, camera)
        this.touchscreen = touchscreen;

    }

    newEntry(){
        console.log('The laptop' + this.modelnum +'has been created, there is ' + this.numInstances + ' laptops available');
    }

    display() {
        console.log(this.modelNumber + " " + this.brand + " " + this.weight + " " + this.price + " " + this.processor
        + this.ram + " " + this.hardDrive + " " + this.cpuCores + " " + this.dimensions + " " + this.display + " "
        + this.os + " " + this.battery + " " + this.camera + " " + this.touchscreen);
    }
}

module.exports = laptop;
