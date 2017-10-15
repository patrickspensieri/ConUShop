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
        this._cleanObjects = [];
        this._dirtyObjects = [];
        this._deletedObjects = [];
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
     * Domain objects that need to be frozen
     * @method registerClean
     * @param {Object} domainObject
     */
    registerClean(domainObject) {
        this._cleanObjects.push(domainObject);
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
     * @method registerRemoved
     * @param {Object} domainObject
     */
    registerRemoved(domainObject) {
        this._deletedObjects(domainObject);
    }

    /**
     * Commit changes to persistance layer 
     * @method commit
     */
    commit() {
        this._insertNew();
        this._freezeClean();
        this._updateDirty();
        this._deletedObjects();
        this._clear();
    }

    /**
     * @method rollback
     */
    rollback() {

    }

    /**
     * Uses mappers to insert the newObjects
     * @method _insertNew
     */
    _insertNew() {

    }

    /**
     * Uses mappers to insert the cleanObjects
     * @method _freezeClean
     */
    _freezeClean() {

    }

    /**
     * Uses mappers to update the dirtyObjects
     * @method _updateDirty
     */
    _updateDirty() {

    }

    /**
     * Uses mappers to delete the deletedObjects
     * @method _deleteRemoved
     */
    _deleteRemoved() {

    }

    /**
     * @method _clear
     */
    _clear() {
        this._newObjects = [];
        this._cleanObjects = [];
        this._dirtyObjects = [];
        this._deletedObjects = [];
    }
}

module.exports = UnitOfWork;
