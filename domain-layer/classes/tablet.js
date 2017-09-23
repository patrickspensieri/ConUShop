class tablet extends portableComputer {
    tablet.numInstances = (laptops.numInstances || 0) + 1; // not tested yet
    constructor (modelnum, brand, display, processor, ram, harddisk, cpu, os, battery, camera, dimensions, weight, price) {
        //should inherited from electronicDevice
        modelnum = super.modelnumMethod() // (This method is located in parent electronicDevice, it must evaluate the instance of the class and determine the number of laptops;);
        this.brand = brand;
        this.weight = weight;
        this.price = price;

        //should be inherited from computer
        this.processor = processor;
        this.ram = ram;
        this.harddisk = harddisk;
        this.cpu = cpu;
        this.dimensions = dimensions;

        //should be inherited from portableComputer
        this.display = display;
        this.os = os;
        this.battery = battery;
        this.camera = camera;

        //no specific attributes
    }

    newEntry(){
        console.log('The tablet' + this.modelnum +'has been created, there is ' + this.numInstances + ' tablets available');
    }
}
