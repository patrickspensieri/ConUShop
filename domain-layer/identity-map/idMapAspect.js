let meld = require('meld');
let DesktopTDG = require('../../data-source-layer/TDG/DesktopTDG');
let DesktopMapper = require('../mappers/DesktopMapper');
let LaptopMapper = require('../mappers/LaptopMapper');
let MonitorMapper = require('../mappers/MonitorMapper');
let TabletMapper = require('../mappers/TabletMapper');

//example
meld.before(DesktopMapper, 'findAll', function() {
    console.log('meld running before');

});

meld.afterReturning(DesktopMapper, 'delete', function(returnTest) {
    deleteObject = returnTest;
    deleteObjectModel = returnTest.model;
    idMap.delete(deleteObject, deleteObjectModel);
});

//module.exports = meld;