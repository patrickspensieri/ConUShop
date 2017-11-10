let meld = require('meld');
let DesktopMapper = require('../mappers/DesktopMapper');
let LaptopMapper = require('../mappers/LaptopMapper');
let MonitorMapper = require('../mappers/MonitorMapper');
let TabletMapper = require('../mappers/TabletMapper');
let ItemMapper = require('../mappers/ItemMapper');
let UserMapper = require('../mappers/UserMapper');
let DesktopTDG = require('../../data-source-layer/TDG/DesktopTDG');
let TabletTDG = require('../../data-source-layer/TDG/TabletTDG');
let LaptopTDG = require('../../data-source-layer/TDG/LaptopTDG');
let MonitorTDG = require('../../data-source-layer/TDG/MonitorTDG');
let ItemTDG = require('../../data-source-layer/TDG/ItemTDG');
let UserTDG = require('../../data-source-layer/TDG/UserTDG');
let Desktop = require('../classes/products/Desktop');

// // map all Mappers and TDGs to advices
// let arrTDG = [DesktopTDG, TabletTDG, LaptopTDG, MonitorTDG, UserTDG, ItemTDG];
// let arrMapper = [DesktopMapper, TabletMapper, MonitorMapper, LaptopMapper, ItemMapper, UserMapper];
// // only testing with DesktopMapper and DesktopTDG first
// arrMapper[0].map((object) => meld.around(object, ['find'], findMapperAdvice));
// arrTDG[0].map((object) => meld.around(object, ['find'], findTDGAdvice));

// /**
//  * Checks if the given model already exists in the idMap.
//  * If exists, return object to calling function using callback.
//  * Else, proceed with Mapper.find() function.
//  *
//  * Intended to run AROUND Mapper.find()
//  * @param  {function} originalMethod Mapper.find() method
//  * @return {function} callback
//  */
// let findMapperAdvice = function(originalMethod) {
//     console.log(meld.joinpoint());
//     let model = meld.joinpoint().args[0];
//     let object = idMap.get(getClassNameHelper(meld.joinpoint().target.name), model);
//     if (object != null) {
//         // if found, return the object to calling function through callback
//         let callback = meld.joinpoint().args[1];
//         return callback(null, object);
//     } else {
//         // else not found, proceed with Mapper.find()
//         originalMethod.proceed();
//     }
// };

// /**
//  * Creates and adds object to the idMap if query returns result.
//  * If found, create the object and to the idMap.
//  *
//  * Intended to run AROUND TDG.find() function.
//  * @param  {function} originalMethod TDG.find() method
//  */
// let findTDGAdvice = function(originalMethod) {
//     console.log(meld.joinpoint());
//     // save the original callback function
//     let originalCallback = meld.joinpoint().args[1];
//     // save target, since meld.joinpoint() cannot be reached outside advice
//     let target = meld.joinpoint().target;
//     // redefine the callback function, add idmap and call original
//     meld.joinpoint().args[1] = function(err, result) {
//         if (result.length==0) {
//             return originalCallback(err, null);
//         } else {
//             // create object and pass to originalCallback
//             let value = result[0];
//             let object = createHelper(value, getClassNameHelper(target.name));
//             idMap.add(object, object.model);
//             return originalCallback(null, object);
//         }
//     };
//     // always proceed with TDG.find()
//     originalMethod.proceed();
// };

// /**
//  * Returns the class name, given a TDG or a Mapper.
//  * @param  {string} targetName target class (TDG or Mapper)
//  * @return {string} Class name
//  */

// let getClassNameHelper = function(targetName) {
//     let classNames = ['Tablet', 'Monitor', 'Laptop', 'Desktop', 'User', 'Item'];
//     for (name of classNames) {
//         if (targetName.includes(name)) {
//             return name;
//         }
//     }
// };

// /**
//  * Returns object created by the appropriate Mapper.
//  * @param  {array} value result from TDG.find()
//  * @param  {string} className class name
//  * @return {Object} object
//  */
// function createHelper (value, className) {
//     switch (className) {
//         case 'Desktop':
//             return DesktopMapper.create(value.model, value.brand, value.processor, value.ram,
//                 value.storage, value.cores, value.dimensions, value.weight, value.price);
//             break;
//         case 'Laptop':
//             return LaptopMapper.create(value.model, value.brand, value.display, value.processor,
//                 value.ram, value.storage, value.cores, value.os,
//                 value.battery, value.camera, value.touch, value.dimensions,
//                 value.weight, value.price);
//             break;
//         case 'Monitor':
//             return MonitorMapper.create(value.model, value.brand, value.size,
//                 value.weight, value.price);
//             break;
//         case 'Tablet':
//             return TabletMapper.create(value.model, value.brand, value.display, value.processor,
//                 value.ram, value.storage, value.cores, value.os,
//                 value.battery, value.camera, value.dimensions,
//                 value.weight, value.price);
//             break;
//         case 'User':
//             return UserMapper.create(value.isadmin, value.firstname,
//                 value.lastname, value.address, value.email, value.phone, value.password, value.sessionid, value.id);
//             break;
//         case 'Item':
//             return ItemMapper.create(value.serialnumber, value.model);
//             break;
//     }
// };


//find
meld.around(DesktopMapper, 'find', findAll);

function findAdvice (methodCall){
    let modelNumber = methodCall.args[0];
    let callback = methodCall. args[1];
        let desktop = idMap.get('Desktop', modelNumber);
        if (desktop != null) {
            return callback(null, desktop);
        } else {
            DesktopTDG.find(modelNumber, function(err, result) {
                if (err) {
                    console.log('Error during desktop find query', null);
                } else {
                    let value = result[0];
                    if (result.length==0) {
                        return callback(err, null);
                    } else {
                        let desktop = new Desktop(value.model, value.brand, value.processor,
                            value.ram, value.storage, value.cores, value.dimensions,
                            value.weight, value.price);
                        idMap.add(desktop, desktop.model);
                        return callback(null, desktop);
                    }
                }
            });
        }
}

//findAll
meld.around(DesktopMapper, 'findAll', findAllAdvice);

function findAllAdvice (methodCall){
    let callback = methodCall.args[0];
    let target = meld.joinpoint().target;
    console.log(target);
    console.log(getClassNameHelper(target));
    DesktopTDG.findAll(function(err, result) {
        let desktops = [];
        if (err) {
            console.log('Error during desktop findALL query', null);
        } else {
            for (let value of result) {
                let desktop = new Desktop(value.model, value.brand, value.processor,
                    value.ram, value.storage, value.cores, value.dimensions,
                    value.weight, value.price);
                desktops.push(desktop);
                if (idMap.get('Desktop', desktop.model) == null) {
                    idMap.add(desktop, desktop.model);
                }
            }
            return callback(null, desktops);
        }
    });
}

//insert
meld.around(DesktopMapper, 'insert', insertAdvice);

function insertAdvice (methodCall){
    let desktopObject = methodCall.args[0];
    DesktopTDG.insert(desktopObject.model, desktopObject.brand, desktopObject.processor,
        desktopObject.ram, desktopObject.storage, desktopObject.cores, desktopObject.dimensions,
        desktopObject.weight, desktopObject.price, function(err, result) {
            if (!err) {
                idMap.add(desktopObject, desktopObject.model);
            }
        });
}

//delete
meld.around(DesktopMapper, 'delete', deleteAdvice);

function deleteAdvice (methodCall){
    let deleteObject = methodCall.args[0];
    DesktopTDG.delete(deleteObject.model, function(err, result) {
        if(!err){
            idMap.delete(deleteObject, deleteObject.model);
        }
    });
}

//update
meld.around(DesktopMapper, 'update', updateAdvice);

function updateAdvice (methodCall){
    let updateObject = methodCall.args[0];
    DesktopTDG.update(updateObject.model, updateObject.brand, updateObject.processor,
        updateObject.ram, updateObject.storage, updateObject.cores, updateObject.dimensions,
        updateObject.weight, updateObject.price, function(err, result) {
            if (!err) {
                idMap.update(updateObject, updateObject.model);
            }
        }); 
}