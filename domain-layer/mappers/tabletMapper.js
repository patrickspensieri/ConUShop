let tablet = require('../../domain-layer/classes/tablet');
let tabletTDG = require('../../data-source-layer/TDG/tabletTDG');

class tabletMapper {
    static find(id) {
        let tablet = tabletTDG.find(id);
        console.log(tablet);
    }

    static findAll() {
        let allTablets = tabletTDG.findAll();
        console.log(allTablets);
    }

    static insert(tabletObject) {
        TDG.insert(tabletObject.modelNumber,tabletObject.brand, tabletObject.displaySize, tabletObject.processor,
            tabletObject.ram, tabletObject.hardDrive, tabletObject.cpuCores, tabletObject.os,
            tabletObject.battery, tabletObject.camera, tabletObject.dimensions,
            tabletObject.weight, tabletObject.price);
    }

    static update(tabletObject) {
        tabletTDG.update(tabletObject.modelNumber, tabletObject.brand, tabletObject.displaySize, tabletObject.processor,
            tabletObject.ram, tabletObject.hardDrive, tabletObject.cpuCores, tabletObject.os,
            tabletObject.battery, tabletObject.camera, tabletObject.dimensions,
            tabletObject.weight, tabletObject.price);

    }

    static delete(tabletObject) {
                    tabletTDG.delete(tabletObject.modelNumber);
    }
}

module.exports = tabletMapper;
