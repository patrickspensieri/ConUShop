let Desktop = require('../../domain-layer/classes/desktop');
let Laptop = require('../../domain-layer/classes/laptop');
let Monitor = require('../../domain-layer/classes/monitor');
let Tablet = require('../../domain-layer/classes/tablet');

let DesktopMapper = require('../mappers/desktopMapper');
let LaptopMapper = require('../mappers/laptopMapper');
let MonitorMapper = require('../mappers/monitorMapper');
let TabletMapper = require('../mappers/tabletMapper');

/**
 * In-memory object which keeps track of which domain objects should 
 * be scheduled for insertion, update, and removal.
 * @class UnitOfWork
 * @export
 */
class UnitOfWork {
  /**
   * @constructor
   */
    constructor() {
        this._newObjects = [];
        this._dirtyObjects = [];
        this._deletedObjects = [];
        this._afterCommit = {};
    }

    /**
     * Domain objects that need to be added to the storage
     * @method registerNew
     * @param {Object} domainObject
     */
    registerNew(domainObject) {
        this._newObjects.push(domainObject);
    }

    /**
     * Domain objects that need to be updated
     * @method registerDirty
     * @param {Object} domainObject
     */
    registerDirty(domainObject) {
        this._dirtyObjects.push(domainObject);
    }

    /**
     * Domain objects that need to be deleted
     * @method registerDeleted
     * @param {Object} domainObject
     */
    registerDeleted(domainObject) {
        this._deletedObjects.push(domainObject);
    }

    /**
     * Commit changes to persistance layer 
     * @method commit
     */
    commit() {
        this._insertNew();
        this._updateDirty();
        this._deletedObjects();
        this._clear();
    }

    /**
     * Roll back all committed objects to in-memory uow
     * @method rollback
     */
    rollback() {
        // TODO: restore database state
        this._newObjects = this._afterCommit['new'];
        this._dirtyObjects = this._afterCommit['dirty'];
        this._deletedObjects = this._afterCommit['deleted'];
    }

    /**
     * Uses mappers to insert the newObjects
     * @method _insertNew
     */
    _insertNew() {
        for (let i=0; i < this._newObjects.length; i++) {
            if (this._newObjects[i] instanceof Desktop) {
                DesktopMapper.insert(this._newObjects[i]);
            }
            if (this._newObjects[i] instanceof Laptop) {
                LaptopMapper.insert(this._newObjects[i]);
            }
            if (this._newObjects[i] instanceof Tablet) {
                TabletMapper.insert(this._newObjects[i]);
            }
            if (this._newObjects[i] instanceof Monitor) {
                MonitorMapper.insert(this._newObjects[i]);
            }
        }
    }

    /**
     * Uses mappers to update the dirtyObjects
     * @method _updateDirty
     */
    _updateDirty() {
        for (let i=0; i < this._dirtyObjects.length; i++) {
            if (this._dirtyObjects[i] instanceof Desktop) {
                DesktopMapper.update(this._dirtyObjects[i]);
            }
            if (this._dirtyObjects[i] instanceof Laptop) {
                LaptopMapper.update(this._dirtyObjects[i]);
            }
            if (this._dirtyObjects[i] instanceof Tablet) {
                TabletMapper.update(this._dirtyObjects[i]);
            }
            if (this._dirtyObjects[i] instanceof Monitor) {
                MonitorMapper.update(this._dirtyObjects[i]);
            }
        }
    }

    /**
     * Uses mappers to delete the deletedObjects
     * @method _deleteRemoved
     */
    _deleteRemoved() {
        for (let i=0; i < this._deletedObjects.length; i++) {
            if (this._deletedObjects[i] instanceof Desktop) {
                DesktopMapper.delete(this._deletedObjects[i]);
            }
            if (this._deletedObjects[i] instanceof Laptop) {
                LaptopMapper.delete(this._deletedObjects[i]);
            }
            if (this._deletedObjects[i] instanceof Tablet) {
                TabletMapper.delete(this._deletedObjects[i]);
            }
            if (this._deletedObjects[i] instanceof Monitor) {
                MonitorMapper.delete(this._deletedObjects[i]);
            }
        }
    }

    /**
     * Private method that empties object lists
     * @method _clear
     */
    _clear() {
        // store committed objects in case of a roll back
        this._afterCommit['new'] = this._newObjects;
        this._afterCommit['dirty'] = this._dirtyObjects;
        this._afterCommit['deleted'] = this._deletedObjects;

        // set object lists empty
        this._newObjects = [];
        this._dirtyObjects = [];
        this._deletedObjects = [];
    }
}

module.exports = UnitOfWork;
