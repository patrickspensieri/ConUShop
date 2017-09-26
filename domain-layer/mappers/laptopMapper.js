let laptop = require('../../domain-layer/classes/laptop');
let laptopTDG = require('../../data-source-layer/TDG/laptopTDG');

class laptopMapper {
    static find(id) {
        let laptop = laptopTDG.find(id);
        console.log(laptop);
    }

    static findAll() {
        let allLaptops = laptopTDG.findAll();
        console.log(allLaptops);
    }

    static insert(laptopObject) {
        laptopTDG.insert(laptopObject.modelNumber,laptopObject.brand, laptopObject.displaySize, laptopObject.processor,
            laptopObject.ram, laptopObject.hardDrive, laptopObject.cpuCores, laptopObject.os,
            laptopObject.battery, laptopObject.camera, laptopObject.touchScreen, laptopObject.dimensions,
            laptopObject.weight, laptopObject.price);
    }

    static update(laptopObject) {
        laptopTDG.update(desktopObject.modelNumber, laptopObject.brand, laptopObject.displaySize, laptopObject.processor,
            laptopObject.ram, laptopObject.hardDrive, laptopObject.cpuCores, laptopObject.os,
            laptopObject.battery, laptopObject.camera, laptopObject.touchScreen, laptopObject.dimensions,
            laptopObject.weight, laptopObject.price);

    }

    static delete(laptopObject) {
            laptopTDG.delete(laptopObject.modelNumber);
    }
}

module.exports = laptopMapper;
