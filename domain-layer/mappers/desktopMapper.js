let desktop = require('../../domain-layer/classes/desktop');
let desktopTDG = require('../../data-source-layer/TDG/desktopTDG');

class desktopMapper {
    static find(id) {

    }

    static findAll() {
        let desktops = [];
        let allDesktops = desktopTDG.findAll();
        console.log(allDesktops);
    }

    static insert(desktopObject) {

    }

    static update(desktopObject) {

    }

    static delete(desktopObject) {

    }
}

module.exports = desktopMapper;
