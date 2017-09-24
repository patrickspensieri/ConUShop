var desktop = require('../../domain-layer/classes/desktop');
var desktopTDG = require('../../data-source-layer/TDG/desktopTDG');

class desktopMapper{

    static find(id){

    }

    static findAll(){
        var desktops = [];
        var allDesktops = desktopTDG.findAll();
        console.log(allDesktops);

    }

    static insert(desktopObject){

    }

    static update(desktopObject){

    }

    static delete(desktopObject){

    }

}

module.exports = desktopMapper;