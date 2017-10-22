let DesktopMapper = require('../mappers/desktopMapper');
let LaptopMapper = require('../mappers/laptopMapper');
let MonitorMapper = require('../mappers/monitorMapper');
let TabletMapper = require('../mappers/tabletMapper');

/**
 * Identitymap
 * @class IdentityMap
 * @export
 */
 class IdentityMap {

    /**
     * @constructor
     * */
    constructor () {
         this._identityMap = {};
    }

    /**
     * Holds object into the identity map.
     * To be run when an instance of that object is called from the DB.
     * @method add
     * @param {Object} object an object of type electronicDevice
     */
    add(object) {   
        if (object) {
            var className = object.constructor.name;
            let mappedObject;
            if (identityMap[className]) {
                mappedObject = identityMap[className][object.model];
                if (mappedObject) {
                    console.log("This object is already mapped");
                    return mappedObject;
                }
                else {
                    identityMap[className][object.model]= object;
                }
            }
            else {
                identityMap[className] = {};
                identityMap[className][object.model] = object;
                mappedObject = object;
            }
            return mappedObject;
        }
        else {
            console.log('This object is invalid');
        }
    }

    /**
     * Returns an object in the Identity Map upon request
     * @method get
     * @param {Object} object an object of type electronicDevice
     */
    get(object) {
        let className = object.constructor.name;
        let mappedObject;
        if (object) {
            if (identityMap[className]) {
                if (identityMap[className][object.model])
                mappedObject = identityMap[className][object.model];
                else {
                    console.log('Error model number not found for that product');
                }
            }
            else {
                console.log('This device class does not exist in the identity map');
            }
        }
        return mappedObject;
    }

    /**
     * Deletes an object in the Identity Map upon request
     * @method delete
     * @param {Object} object an object of type electronicDevice
     */
    delete(object) { 
        var className = object.constructor.name;
        if(object) {
        delete identityMap[className][object.model];
        }
        else {
            console.log('Invalid item');
        }
    }

    /**
     * Deletes all objects in the Identity Map upon logging out
     * @method delete
     */
    clear() {
        if (req.user) {
            console.log("Identity Map cannot be cleared, user is still logged in!");
        } 
        else {
            Object.keys(identityMap).forEach(key => {
                var deviceType = key;
                Object.keys(identityMap[deviceType]).forEach(key2 => {
                    var deviceID = key2;
                    delete identityMap[deviceType][deviceID];
                    console.log("This item " + deviceID + ". Has been deleted from the Identity Map")
                });
            delete identityMap[deviceType];
            console.log("All items in " + deviceType + " has been deleted.")
            });       
        }
    }

}