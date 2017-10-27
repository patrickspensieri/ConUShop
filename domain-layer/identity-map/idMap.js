let DesktopMapper = require('../mappers/desktopMapper');
let LaptopMapper = require('../mappers/laptopMapper');
let MonitorMapper = require('../mappers/monitorMapper');
let TabletMapper = require('../mappers/tabletMapper');
let UnitOfWork = require('../unit-of-work/unitOfWork');

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
     * @static
     * @param {Object} object an object of type electronicDevice
     */
    static add(newObject) {
        let className = newObject.constructor.name;
        let mappedObject;
        if (_identityMap[className]) {
            mappedObject = _identityMap[className][newObject.model];
            if (mappedObject) {
                console.log("This object is already mapped");
                return mappedObject;
            }
            else {
                _identityMap[className][newObject.model]= newObject;
            }
        }
        else {
            _identityMap[className] = {};
            _identityMap[className][newObject.model] = newObject;
            mappedObject = newObject;
        }
        return mappedObject;
    }

    /**
     * Updates an object in the Identity Map upon request
     * @method update
     * @static
     * @param {Object} updatedObject an object of type electronicDevice
     */
    static update(updatedObject) {
        let className = object.constructor.name;
        let mappedObject;
        if (_identityMap[className][updatedObject.model]){
            _identityMap[className][updatedObject.model] = updatedObject;
        }
    }

    /**
     * Deletes an object in the Identity Map upon request
     * @method delete
     * @static
     * @param {Object} deletedObject an object of type electronicDevice
     */
    static delete(deletedObject) { 
        var className = deletedObject.constructor.name;
        if(deletedObject) {
        delete _identityMap[className][deletedObject.model];
        }
        else {
            console.log('Invalid item');
        }
    }

    /**
     * Returns an object in the Identity Map upon request
     * adds it to the idMap if now found
     * @method get
     * @static
     * @param {Object} object an object of type electronicDevice
     */
    static get(className,id) {
        //let className = object.constructor.name;
        let mappedObject;
        if (_identityMap[className][id]) {
            mappedObject = _identityMap[className][id];
            return mappedObject;
        }
        if (_identityMap[className][id] == null) {
            mappedObject = this.add(object);
        }
    }

    /**
     * Returns all objects in the _identityMap
     * @method getAll
     * @static
     */
    static getAll() {
        if(req.user) {
            Object.keys(_identityMap).forEach(key => {
                var deviceType = key;
                Object.keys(_identityMap[deviceType]).forEach(key2 => {
                    var deviceID = key2;
                    console.log(_identityMap[deviceType][deviceID]);
                });
            });
        }
        else {
            return "User is not logged in";
        }
    }

    /**
     * Deletes all objects in the Identity Map upon logging out
     * @method delete
     * @static
     */
    static clear() {
        if (!req.user) {
            Object.keys(_identityMap).forEach(key => {
                var deviceType = key;
                Object.keys(_identityMap[deviceType]).forEach(key2 => {
                    var deviceID = key2;
                    delete _identityMap[deviceType][deviceID];
                    console.log("This item " + deviceID + ". Has been deleted from the Identity Map")
                });
            delete _identityMap[deviceType];
            console.log("All items in " + deviceType + " has been deleted.")
            });       
        } 
        else {
            console.log("Identity Map cannot be cleared, user is still logged in!");
        }
    }
}

module.exports = IdentityMap;