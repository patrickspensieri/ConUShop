let db = require('../db');
let desktopMapper = require('../domain-layer/mappers/desktopMapper');
let laptopMapper = require('../domain-layer/mappers/laptopMapper');
let monitorMapper = require('../domain-layer/mappers/monitorMapper');
let tabletMapper = require('../domain-layer/mappers/tabletMapper');
let televisionMapper = require('../domain-layer/mappers/televisionMapper');


module.exports.getDesktopList = function(callback){
    // To be replaced with find methods when they work.
    db.query('SELECT * FROM desktop', [], (err, res) => {
        if (err) {
            callback('Error during desktop query', null);
        }
        else {
            callback(null, res);
        }
    });
}

module.exports.getLaptopList = function(callback){

    // To be replaced with find methods when they work.
    db.query('SELECT * FROM laptop', [], (err, res) => {
        if (err) {
            callback("Error during laptop query", null);
        }
        else {
            callback(null, res);
        }
    });
}

module.exports.getMonitorList = function(callback){

    // To be replaced with find methods when they work.
    db.query('SELECT * FROM monitor', [], (err, res) => {
        if (err) {
            callback("Error during monitor query", null);
        }
        else {
            callback(null, res);
        }
    });
}

module.exports.getTabletList = function(callback){

    // To be replaced with find methods when they work.
    db.query('SELECT * FROM tablet', [], (err, res) => {
        if (err) {
            callback("Error during tablet query", null);
        }
        else {
            callback(null, res);
        }
    });
}

module.exports.getTelevisionList = function(callback){

    // To be replaced with find methods when they work.
    db.query('SELECT * FROM television', [], (err, res) => {
        if (err) {
            callback("Error during television query", null);
        }
        else {
            callback(null, res);
        }
    });
}

module.exports.addDesktopItem = function(newDesktop){

    desktopMapper.insert(newDesktop);
}


module.exports.addLaptopItem = function(newLaptop){

  laptopMapper.insert(newLaptop);
}

module.exports.addMonitorItem = function(newMonitor){

    monitorMapper.insert(newMonitor);
}

module.exports.addTabletItem = function(newTablet){

    tabletMapper.insert(newTablet);
}

module.exports.addTelevisionItem = function(newTelevision){

    televisionMapper.insert(newTelevision);

}


