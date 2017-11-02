/**
 * Identitymap
 * @class IdentityMap
 * @export
 */
 class IdentityMap {
    /**
     * @constructor
     */
    constructor() {
         this._identityMap = {};
    }

    /**
     * Holds object into the identity map.
     * To be run when an instance of that object is called from the DB.
     * @method add
     * @param {newObject} newObject an object of type electronicDevice
     * @param {id} id an of object
     */
     add(newObject, id) {
        let className = newObject.constructor.name;
        let mappedObject;

        if (this._identityMap[className]) {
            mappedObject = this._identityMap[className][id];
            if (mappedObject) {
                console.log('This object is already mapped');
            } else {
                this._identityMap[className][id]= newObject;
                console.log('This object has been added');
            }
        } else {
            this._identityMap[className] = {};
            this._identityMap[className][id] = newObject;
        }
    }

    /**
     * Updates an object in the Identity Map upon request
     * @method update
     * @param {Object} updatedObject an object of type electronicDevice
     * @param {id} id an of object
     */
     update(updatedObject, id) {
        let className = updatedObject.constructor.name;
        if (this._identityMap[className][id]) {
            this._identityMap[className][id] = updatedObject;
        }
    }

    /**
     * Deletes an object in the Identity Map upon request
     * @method delete
     * @param {Object} deletedObject an object of type electronicDevice
     * @param {id} id an of object
     */
     delete(deletedObject, id) {
        let className = deletedObject.constructor.name;
        delete this._identityMap[className][id];
    }

    /**
     * Returns an object in the Identity Map upon request
     * adds it to the idMap if now found
     * @method get
     * @param {className} className an object of type electronicDevice
     * @param {id} id an of object
     * @return {Object} mappedObject
     */
     get(className, id) {
        let mappedObject;
        if (this._identityMap[className]) {
            mappedObject = this._identityMap[className][id];
            if (mappedObject) {
                return mappedObject;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    /**
     * Returns all objects in the this._identityMap
     * @method getAll
     */
     getAll() {
        Object.keys(this._identityMap).forEach((key) => {
            let deviceType = key;
            Object.keys(this._identityMap[deviceType]).forEach((key2) => {
                let deviceID = key2;
                console.log(this._identityMap[deviceType][deviceID]);
            });
        });
    }

    /**
     * Deletes all objects in the Identity Map upon logging out
     * @method delete
     */
     clear() {
        if (!req.user) {
            Object.keys(this._identityMap).forEach((key) => {
                let deviceType = key;
                Object.keys(this._identityMap[deviceType]).forEach((key2) => {
                    let deviceID = key2;
                    delete this._identityMap[deviceType][deviceID];
                    console.log('This item ' + deviceID + '. Has been deleted from the Identity Map');
                });
            delete this._identityMap[deviceType];
            console.log('All items in ' + deviceType + ' has been deleted.');
            });
        } else {
            console.log('Identity Map cannot be cleared, user is still logged in!');
        }
    }
}

module.exports = IdentityMap;
