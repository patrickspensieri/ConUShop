/**
 * Abstract object mapper
 * @class AbstractMapper
 * @export
 */
class AbstractMapper {
  /**
   * Registers a single object new in the UOW and commits.
   * @static
   * @param {Object} object an object.
   */
    static makeInsertion(object) {
        id = object.getId();
        idMap.add(object, id);
        UOW.registerNew(object);
        UOW.commit();
    }

  /**
   * Registers a single object dirty in the UOW and commits.
   * @static
   * @param {Object} object an object.
   */
    static makeUpdate(object) {
        id = object.getId();
        idMap.update(object, id);
        UOW.registerDirty(object);
        UOW.commit();
    }

   /**
    * Registers a single object deleted in the UOW and commits.
    * @static
    * @param {Object} object an object.
    */
    static makeDeletion(object) {
        id = object.getId();
        idMap.delete(object, id);
        UOW.registerDeleted(object);
        UOW.commit();
    }

   /**
    * Commits the UOW
    * @static
    */
    static commit() {
        UOW.commit();
    }
}

module.exports = AbstractMapper;
