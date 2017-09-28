let television = require('../../domain-layer/classes/television');
let televisionTDG = require('../../data-source-layer/TDG/televisionTDG');

/**
 * television object mapper
 * @class televisionMapper
 * @export
 */
class televisionMapper {
  /**
   * Maps the returned value to an object of type television.
   * @static
   * @param {string} id model number of television to be found.
   * @return television object.
   */
    static find(id) {
        let television = televisionTDG.find(id);
        return new television(television.modelNumber, television.brand, television.dimensions,
            television.weight, television.price);
    }

  /**
   * Maps all returned values into objects of type television.
   * @static
   * @return array of television objects.
   */
    static findAll() {
        let televisions = [];
        let allTelevisions = televisionTDG.findAll();
        for (let television of allTelevisions) {
            televisions.push(new television(television.modelNumber, television.brand, television.dimensions,
                television.weight, television.price));
        }
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} televisionObject an object of type television.
   */
    static insert(televisionObject) {
        televisionTDG.insert(televisionObject.modelNumber, televisionObject.brand, televisionObject.dimensions,
            televisionObject.weight, televisionObject.price);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} televisionObject an object of type television.
   */
    static update(televisionObject) {
        televisionTDG.update(televisionObject.modelNumber, televisionObject.brand, televisionObject.dimensions,
            televisionObject.weight, televisionObject.price);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} televisionObject an object of type television.
   */
    static delete(televisionObject) {
        televisionTDG.delete(televisionObject.modelNumber);
    }
}

module.exports = televisionMapper;
