let Desktop = require('../../domain-layer/classes/desktop');
let DesktopTDG = require('../../data-source-layer/TDG/desktopTDG');
let IdentityMap = require('../identity-map/idMap');
/**
 * Desktop object mapper
 * @class DesktopMapper
 * @export
 */
class DesktopMapper {
  /**
   * Creates a new desktop
   * @static
   * @param {string} model model number of desktop.
   * @param {string} brand brand of desktop.
   * @param {string} processor processor in desktop.
   * @param {number} ram ram amount in desktop.
   * @param {number} storage storage size of desktop.
   * @param {number} cores amount of cores in processor in desktop.
   * @param {string} dimensions dimensions of desktop.
   * @param {number} weight weight of desktop.
   * @param {number} price price of desktop.
   * @return desktop object.
   */
    static makeNew(model, brand, processor, ram, storage, cores, dimensions, weight, price) {
        let desktop = new Desktop(model, brand, processor, ram, storage, cores, dimensions, weight, price);
        UOW.registerNew(desktop);
        idMap.add(desktop);
        return desktop;
    }

  /**
   * Registers an object dirty in the UOW
   * @static
   * @param {Object} desktop an object of type desktop.
   */
    static makeUpdate(desktop) {
        UOW.registerDirty(desktop);
    }

  /**
   * Registers an object deleted in the UOW
   * @static
   * @param {Object} desktop an object of type desktop.
   */
    static makeDeletion(desktop) {
        UOW.registerDeleted(desktop);
    }

  /**
   * Commits the UOW
   * @static
   */
    static commit() {
        UOW.commit();
    }

  /**
   * Adds into the IdentityMap
   * @static
   */
    static add(newObject) {
        IdentityMap.add(newObject);
    }
    
  /**
   * Adds into the IdentityMap
   * @static
   * @param {Object} deletedObject an object of type Dekstop
   */
    static addInIdMap(newObject) {
        IdentityMap.add(newObject);
    }    

  /**
   * Delete into the IdentityMap
   * @static
   * @param {Object} deletedObject an object of type Dekstop
   */
    static deleteInIdMap(deleteObject) {
        IdentityMap.delete(deleteObject);
    }
        
  /**
   * Maps the returned value to an object of type desktop.
   * @static
   * @param {string} id model number of desktop to be found.
   * @return desktop object.
   */
    static find(id, callback) {
        if (IdentityMap.get("Desktop",id)) {
            return IdentityMap.get("Desktop",id);
        }
        else {
            DesktopTDG.find(id, function(err, result) {
                if (err) {
                    console.log('Error during desktop find query', null);
                } else {
                    let value = result[0];
                    let desktop = new Desktop(value.model, value.brand, value.processor,
                        value.ram, value.storage, value.cores, value.dimensions,
                        value.weight, value.price);
                    IdentityMap.add(desktop);
                    return callback(null, desktop);
                }
            });
        }
    }

  /**
   * Maps all returned values into objects of type desktop.
   * @static
   * @return array of desktop objects.
   */
    static findAll(callback) {
        DesktopTDG.findAll(function(err, result) {
            let desktops = [];
            if (err) {
                console.log('Error during desktop findALL query', null);
            } else {
                for (let value of result) {
                    desktops.push(new Desktop(value.model, value.brand, value.processor,
                        value.ram, value.storage, value.cores, value.dimensions,
                        value.weight, value.price));
                }
                return callback(null, desktops);
            }
        });
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} desktopObject an object of type desktop.
   */
    static insert(desktopObject) {
        DesktopTDG.insert(desktopObject.model, desktopObject.brand, desktopObject.processor,
            desktopObject.ram, desktopObject.storage, desktopObject.cores, desktopObject.dimensions,
            desktopObject.weight, desktopObject.price);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} desktopObject an object of type desktop.
   */
    static update(desktopObject) {
        DesktopTDG.update(desktopObject.model, desktopObject.brand, desktopObject.processor,
            desktopObject.ram, desktopObject.storage, desktopObject.cores, desktopObject.dimensions,
            desktopObject.weight, desktopObject.price);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} desktopObject an object of type desktop.
   */
    static delete(desktopObject) {
        DesktopTDG.delete(desktopObject.model);
    }
}

module.exports = DesktopMapper;
