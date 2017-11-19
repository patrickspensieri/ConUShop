let meld = require('meld');
let DesktopMapper = require('../mappers/DesktopMapper');
let LaptopMapper = require('../mappers/LaptopMapper');
let MonitorMapper = require('../mappers/MonitorMapper');
let TabletMapper = require('../mappers/TabletMapper');
let ItemMapper = require('../mappers/ItemMapper');
let UserMapper = require('../mappers/UserMapper');
let OrderMapper = require('../mappers/OrderItemMapper');
let OrderItemMapper = require('../mappers/OrderItemMapper');
let DesktopTDG = require('../../data-source-layer/TDG/DesktopTDG');
let TabletTDG = require('../../data-source-layer/TDG/TabletTDG');
let LaptopTDG = require('../../data-source-layer/TDG/LaptopTDG');
let MonitorTDG = require('../../data-source-layer/TDG/MonitorTDG');
let ItemTDG = require('../../data-source-layer/TDG/ItemTDG');
let OrderTDG = require('../../data-source-layer/TDG/OrderTDG');
let OrderItemTDG = require('../../data-source-layer/TDG/OrderItemTDG');
let UserTDG = require('../../data-source-layer/TDG/UserTDG');


let arrMapper = [DesktopMapper, TabletMapper, MonitorMapper, LaptopMapper, ItemMapper, UserMapper];
arrMapper.map((object) => meld.around(object, ['find'], findAdvice));
arrMapper.map((object) => meld.around(object, ['findAll'], findAllAdvice));
arrMapper.map((object) => meld.around(object, ['insert'], insertAdvice));
arrMapper.map((object) => meld.around(object, ['update'], updateAdvice));
arrMapper.map((object) => meld.around(object, ['delete'], deleteAdvice));

/**
 * [findAdvice description]
 * @param  {[type]} methodCall [description]
 * @return {[type]}            [description]
 */
function findAdvice(methodCall) {
    let id = methodCall.args[0];
    let callback = methodCall. args[1];
    let className = getClassNameHelper(meld.joinpoint().target.name);
    let classTDG = getTDGHelper(className);
    let classMapper = getMapperHelper(className);
        let object = idMap.get(className, id);
        if (object != null) {
            return callback(null, object);
        } else {
            classTDG.find(id, function(err, result) {
                if (err) {
                    console.log('Error during find query', null);
                } else {
                    let value = result[0];
                    if (result.length==0) {
                        return callback(err, null);
                    } else {
                        let object = classMapper.create(...getAttributesHelper(value, className));
                        idMap.add(object, id);
                        return callback(null, object);
                    }
                }
            });
        }
}

/**
 * [findAllAdvice description]
 * @param  {[type]} methodCall [description]
 */
function findAllAdvice(methodCall) {
    let callback = methodCall.args[0];
    let className = getClassNameHelper(meld.joinpoint().target.name);
    let classTDG = getTDGHelper(className);
    let classMapper = getMapperHelper(className);
    classTDG.findAll(function(err, result) {
        let objects = [];
        if (err) {
            console.log('Error during desktop findALL query', null);
        } else {
            for (let value of result) {
                let object = classMapper.create(...getAttributesHelper(value, className));
                let id = object[Object.keys(object)[0]];
                objects.push(object);
                if (idMap.get(className, id) == null) {
                    idMap.add(object, id);
                }
            }
            return callback(null, objects);
        }
    });
}

/**
 * [insertAdvice description]
 * @param  {[type]} methodCall [description]
 */
function insertAdvice(methodCall) {
    let className = getClassNameHelper(meld.joinpoint().target.name);
    let classTDG = getTDGHelper(className);
    let object = methodCall.args[0];
    let id = object[Object.keys(object)[0]];
    classTDG.insert(...getObjectAttributesHelper(object, className), function(err, result) {
            if (!err) {
                idMap.add(object, id);
            }
        });
}

/**
 * [deleteAdvice description]
 * @param  {[type]} methodCall [description]
 */
function deleteAdvice(methodCall) {
    let className = getClassNameHelper(meld.joinpoint().target.name);
    let classTDG = getTDGHelper(className);
    let object = methodCall.args[0];
    let id = object[Object.keys(object)[0]];
    if (className == 'User') {
      id = object[Object.keys(object)[4]];
       classTDG.delete(id, function(err, result) {
         if (!err) {
             idMap.delete(object, id);
         }
     });
    } else {
        classTDG.delete(id, function(err, result) {
            if (!err) {
                idMap.delete(object, id);
            }
        });
    }
}

/**
 * [updateAdvice description]
 * @param  {[type]} methodCall [description]
 */
function updateAdvice(methodCall) {
    let className = getClassNameHelper(meld.joinpoint().target.name);
    let classTDG = getTDGHelper(className);
    let object = methodCall.args[0];
    let id = object[Object.keys(object)[0]];
    classTDG.update(...getObjectAttributesHelper(object, className), function(err, result) {
            if (!err) {
                idMap.update(object, id);
            }
        });
}

/**
 * Returns the class name, given a TDG or a Mapper.
 * @param  {string} targetName target class (TDG or Mapper)
 * @return {string} Class name
 */
let getClassNameHelper = function(targetName) {
    let classNames = ['Tablet', 'Monitor', 'Laptop', 'Desktop', 'User', 'Item', 'Order', 'OrderItem'];
    for (name of classNames) {
        if (targetName.includes(name)) {
            return name;
        }
    }
};

/**
 * Models (intended for use with database results)
 * @param  {[type]} value     [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
let getAttributesHelper = function(value, className) {
    switch (className) {
        case 'Desktop':
            return [value.model, value.brand, value.processor, value.ram,
                value.storage, value.cores, value.dimensions, value.weight, value.price];
            break;
        case 'Laptop':
            return [value.model, value.brand, value.display, value.processor,
                value.ram, value.storage, value.cores, value.os,
                value.battery, value.camera, value.touch, value.dimensions,
                value.weight, value.price];
            break;
        case 'Monitor':
            return [value.model, value.brand, value.size,
                value.weight, value.price];
            break;
        case 'Tablet':
            return [value.model, value.brand, value.display, value.processor,
                value.ram, value.storage, value.cores, value.os,
                value.battery, value.camera, value.dimensions,
                value.weight, value.price];
            break;
        case 'User':
            return [value.firstname,
                value.lastname, value.address, value.email, value.phone, value.password, value.isadmin, value.sessionid, value.id];
            break;
        case 'Item': /* Item object attributes different than database result*/
            return [value.serialnumber, value.model, value.islocked];
            break;
        case 'Order': /* Item object attributes different than database result*/
            return [value.order_id, value.user_id, value.orderdate,
                value.total, value.shoppingCart];
            break;
        case 'OrderItem': /* Item object attributes different than database result*/
            return [value.order_item_id, value.order_id, value.serialnumber, value.price,
                value.isreturned];
            break;
        }
};

/**
 * Models (intended for use with object attributes)
 * @param  {[type]} value     [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
let getObjectAttributesHelper = function(value, className) {
    switch (className) {
        case 'Desktop':
            return [value.model, value.brand, value.processor, value.ram,
                value.storage, value.cores, value.dimensions, value.weight, value.price];
            break;
        case 'Laptop':
            return [value.model, value.brand, value.display, value.processor,
                value.ram, value.storage, value.cores, value.os,
                value.battery, value.camera, value.touch, value.dimensions,
                value.weight, value.price];
            break;
        case 'Monitor':
            return [value.model, value.brand, value.size,
                value.weight, value.price];
            break;
        case 'Tablet':
            return [value.model, value.brand, value.display, value.processor,
                value.ram, value.storage, value.cores, value.os,
                value.battery, value.camera, value.dimensions,
                value.weight, value.price];
            break;
        case 'User':
            return [value.firstname,
                value.lastname, value.address, value.email, value.phone, value.password, value.isadmin, value.sessionid, value.id];
            break;
        case 'Item': /* Item object attributes different than database result*/
            return [value.serialNumber, value.modelNumber, value.isLocked];
            break;
        case 'Order': /* Item object attributes different than database result*/
            return [value.orderId, value.userId, value.orderDate,
                value.total, value.shoppingCart];
            break;
        case 'OrderItem': /* Item object attributes different than database result*/
            return [value.orderItemId, value.orderId, value.serialNumber, value.price,
                value.isReturned];
            break;
        }
};

/**
 * [getTDGHelper description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
let getTDGHelper = function(className) {
    switch (className) {
        case 'Desktop':
            return DesktopTDG;
            break;
        case 'Laptop':
            return LaptopTDG;
            break;
        case 'Monitor':
            return MonitorTDG;
            break;
        case 'Tablet':
            return TabletTDG;
            break;
        case 'Item':
            return ItemTDG;
            break;
        case 'User':
            return UserTDG;
            break;
        case 'Order':
            return OrderTDG;
            break;
        case 'OrderItem':
            return OrderItemTDG;
            break;
    }
};

/**
 * [getMapperHelper description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
let getMapperHelper = function(className) {
    switch (className) {
        case 'Desktop':
            return DesktopMapper;
            break;
        case 'Laptop':
            return LaptopMapper;
            break;
        case 'Monitor':
            return MonitorMapper;
            break;
        case 'Tablet':
            return TabletMapper;
            break;
        case 'Item':
            return ItemMapper;
            break;
        case 'User':
            return UserMapper;
            break;
        case 'Order':
            return OrderMapper;
            break;
        case 'OrderItem':
            return OrderItemMapper;
            break;
    }
};
