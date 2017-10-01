let Television = require('../../domain-layer/classes/Television');
let TelevisionTDG = require('../../data-source-layer/TDG/TelevisionTDG');

/**
 * Television object mapper
 * @class TelevisionMapper
 * @export
 */
class TelevisionMapper {
  /**
   * Maps the returned value to an object of type television.
   * @static
   * @param {string} id model number of television to be found.
   * @return television object.
   */
    static find(id, callback) {
        TelevisionTDG.find(id, function(err, result){
            if (err) {
                console.log('Error during television find query', null);
            }
            else{
                value = result.rows[0];
                return callback(null, new Television(value.model, value.brand, value.dimensions,
                    value.weight, value.price));
            }
        });
    }

  /**
   * Maps all returned values into objects of type television.
   * @static
   * @return array of television objects.
   */
    static findAll(callback) {
        TelevisionTDG.findAll(function(err, result){
            let televisions = [];
            if (err) {
                console.log('Error during television findALL query', null);
            }
            else {
                for (let value of result) {
                    televisions.push(new Television(value.model, value.brand, value.dimensions,
                        value.weight, value.price));
                }
                return callback(null, televisions);
            }
        });
    }

  /**
   * Maps an objects attributes to seperate values for TDG insert method.
   * @static
   * @param {Object} televisionObject an object of type television.
   */
    static insert(televisionObject) {
        TelevisionTDG.insert(televisionObject.model, televisionObject.brand, televisionObject.dimensions,
            televisionObject.weight, televisionObject.price);
    }

  /**
   * Maps an objects attributes to seperate values for TDG update method.
   * @static
   * @param {Object} televisionObject an object of type television.
   */
    static update(televisionObject) {
        TelevisionTDG.update(televisionObject.model, televisionObject.brand, televisionObject.dimensions,
            televisionObject.weight, televisionObject.price);
    }

  /**
   * Extracts an objects id to use with TDG delete method.
   * @static
   * @param {Object} televisionObject an object of type television.
   */
    static delete(televisionObject) {
        TelevisionTDG.delete(televisionObject.model);
    }
}

module.exports = TelevisionMapper;
