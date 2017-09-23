var computer = require('./computer.js');

class desktop extends computer {
    constructor(modelNumber, brand, weight, price, processor, ram, hardDrive, cpuCores, dimensions){
        super(modelNumber, brand, weight, price, processor, ram, hardDrive, cpuCores, dimensions)
    }
}

module.exports = desktop;