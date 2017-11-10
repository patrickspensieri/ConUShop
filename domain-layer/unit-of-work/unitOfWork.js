let contract = require('obligations');
let DesktopMapper = require('../mappers/desktopMapper');
let LaptopMapper = require('../mappers/laptopMapper');
let MonitorMapper = require('../mappers/monitorMapper');
let TabletMapper = require('../mappers/tabletMapper');
let UserMapper = require('../mappers/userMapper');
let ItemMapper = require('../mappers/itemMapper');
let OrderItemMapper = require('../mappers/OrderItemMapper');
let OrderMapper = require('../mappers/OrderMapper');

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
        contract.precondition(domainObject != null);
        contract.precondition(this._dirtyObjects.includes(domainObject) == false, 'cant register a dirty obj as new');
        contract.precondition(this._deletedObjects.includes(domainObject) == false, 'cant register a removed obj as new');
        contract.precondition(this._newObjects.includes(domainObject) == false, 'cant register a obj new twice');
        this._newObjects.push(domainObject);
        contract.postcondition(this._newObjects.includes(domainObject) == true, 'new obj added to new list');
    }

    /**
     * Domain objects that need to be updated
     * @method registerDirty
     * @param {Object} domainObject
     */
    registerDirty(domainObject) {
        contract.precondition(domainObject != null);
        contract.precondition(this._deletedObjects.includes(domainObject) == false, 'cant register a removed obj as dirty');
        if (!this._dirtyObjects.includes(domainObject) && !this._newObjects.includes(domainObject)) {
            this._dirtyObjects.push(domainObject);
        } 
    }

    /**
     * Domain objects that need to be deleted
     * @method registerDeleted
     * @param {Object} domainObject
     */
    registerDeleted(domainObject) {
        contract.precondition(domainObject != null);
        contract.precondition(this._deletedObjects.includes(domainObject) == false, 'cant register a removed obj as dirty');
        this._deletedObjects.push(domainObject);
    }

    /**
     * Commit changes to persistance layer 
     * @method commit
     */
    commit() {
        this._insertNew();
        this._updateDirty();
        this._deleteRemoved();
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
            if (this._newObjects[i].constructor.name == 'Desktop') {
                DesktopMapper.insert(this._newObjects[i]);
            }
            if (this._newObjects[i].constructor.name == 'Laptop') {
                LaptopMapper.insert(this._newObjects[i]);
            }
            if (this._newObjects[i].constructor.name == 'Tablet') {
                TabletMapper.insert(this._newObjects[i]);
            }
            if (this._newObjects[i].constructor.name == 'Monitor') {
                MonitorMapper.insert(this._newObjects[i]);
            }
            if (this._newObjects[i].constructor.name == 'User') {
                UserMapper.insert(this._newObjects[i]);
            }
            if (this._newObjects[i].constructor.name == 'Item') {
                ItemMapper.insert(this._newObjects[i]);
            }
            if (this._newObjects[i].constructor.name == 'OrderItem') {
                OrderItemMapper.insert(this._newObjects[i]);
            }
            if (this._newObjects[i].constructor.name == 'Order') {
                OrderMapper.insert(this._newObjects[i]);
            }
        }
    }

    /**
     * Uses mappers to update the dirtyObjects
     * @method _updateDirty
     */
    _updateDirty() {
        for (let i=0; i < this._dirtyObjects.length; i++) {
            if (this._dirtyObjects[i].constructor.name == 'Desktop') {
                DesktopMapper.update(this._dirtyObjects[i]);
            }
            if (this._dirtyObjects[i].constructor.name == 'Laptop') {
                LaptopMapper.update(this._dirtyObjects[i]);
            }
            if (this._dirtyObjects[i].constructor.name == 'Tablet') {
                TabletMapper.update(this._dirtyObjects[i]);
            }
            if (this._dirtyObjects[i].constructor.name == 'Monitor') {
                MonitorMapper.update(this._dirtyObjects[i]);
            }
            if (this._dirtyObjects[i].constructor.name == 'User') {
                UserMapper.update(this._dirtyObjects[i]);
            }
            if (this._dirtyObjects[i].constructor.name == 'Item') {
                ItemMapper.update(this._dirtyObjects[i]);
            }
            if (this._dirtyObjects[i].constructor.name == 'OrderItem') {
                OrderItemMapper.update(this._dirtyObjects[i]);
            }
            if (this._dirtyObjects[i].constructor.name == 'Order') {
                OrderMapper.update(this._dirtyObjects[i]);
            }
        }
    }

    /**
     * Uses mappers to delete the deletedObjects
     * @method _deleteRemoved
     */
    _deleteRemoved() {
        for (let i=0; i < this._deletedObjects.length; i++) {
            if (this._deletedObjects[i].constructor.name == 'Desktop') {
                DesktopMapper.delete(this._deletedObjects[i]);
            }
            if (this._deletedObjects[i].constructor.name == 'Laptop') {
                LaptopMapper.delete(this._deletedObjects[i]);
            }
            if (this._deletedObjects[i].constructor.name == 'Tablet') {
                TabletMapper.delete(this._deletedObjects[i]);
            }
            if (this._deletedObjects[i].constructor.name == 'Monitor') {
                MonitorMapper.delete(this._deletedObjects[i]);
            }
            if (this._deletedObjects[i].constructor.name == 'User') {
                UserMapper.delete(this._deletedObjects[i]);
            }
            if (this._deletedObjects[i].constructor.name == 'Item') {
                ItemMapper.delete(this._deletedObjects[i]);
            }
            if (this._deletedObjects[i].constructor.name == 'OrderItem') {
                OrderItemMapper.delete(this._deletedObjects[i]);
            }
            if (this._deletedObjects[i].constructor.name == 'Order') {
                OrderMapper.delete(this._deletedObjects[i]);
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
