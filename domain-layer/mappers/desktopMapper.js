let desktop = require('../../domain-layer/classes/desktop');
let desktopTDG = require('../../data-source-layer/TDG/desktopTDG');

class desktopMapper {
    static find(id) {
        let desktop = desktopTDG.find(id);
        console.log(desktop);
    }

    static findAll() {
        let desktops = [];
        let allDesktops = desktopTDG.findAll();
        console.log(allDesktops);
    }

    static insert(desktopObject) {
        desktopTDG.insert(desktopObject.modelNumber, desktopObject.brand, desktopObject.processor,
            desktopObject.ram, desktopObject.hardDrive, desktopObject.cpuCores, desktopObject.dimension,
            desktopObject.weight, desktopObject.price)
    }

    static update(desktopObject) {
        desktopTDG.update(desktopObject.modelNumber, desktopObject.brand, desktopObject.processor,
            desktopObject.ram, desktopObject.hardDrive, desktopObject.cpuCores, desktopObject.dimension,
            desktopObject.weight, desktopObject.price)
    }

    static delete(desktopObject) {
        desktopTDG.delete(desktopObject.modelNumber);
    }
}

module.exports = desktopMapper;
