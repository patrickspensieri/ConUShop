let monitor = require('../../domain-layer/classes/monitor');
let monitorTDG = require('../../data-source-layer/TDG/monitorTDG');

class monitorMapper {
    static find(id) {
        let monitor = monitorTDG.find(id);
        console.log(monitor);
    }

    static findAll() {
        let monitors = [];
        let allmonitors = monitorTDG.findAll();
        console.log(allmonitors);
    }

    static insert(monitorObject) {
        monitorTDG.insert(monitorObject.modelNumber, monitorObject.brand, monitorObject.size,
            monitorObject.weight, monitorObject.price)
    }

    static update(monitorObject) {
        monitorTDG.update(monitorObject.modelNumber, monitorObject.brand, monitorObject.size,
            monitorObject.weight, monitorObject.price)
    }

    static delete(monitorObject) {
        monitorTDG.delete(monitorObject.modelNumber);
    }
}

module.exports = monitorMapper;
