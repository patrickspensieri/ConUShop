var portableComputer = require('./portableComputer.js');

class tablet extends portableComputer {
    tablet.numInstances = (laptops.numInstances || 0) + 1; // not tested yet
    constructor (modelNumber, brand, weight, price, processor, ram, hardDrive, cpuCores, dimensions, displaySize, os, battery, camera) {
        //should inherited from electronicDevice
        modelnum = super.modelnumMethod() // (This method is located in parent electronicDevice, it must evaluate the instance of the class and determine the number of laptops;);
        super(modelNumber, brand, weight, price, processor, ram, hardDrive, cpuCores, dimensions, displaySize, os, battery, camera)
    }

    newEntry(){
        console.log('The tablet' + this.modelnum +'has been created, there is ' + this.numInstances + ' tablets available');
    }
}

module.exports = tablet;