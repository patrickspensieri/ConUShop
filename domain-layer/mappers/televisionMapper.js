let television = require('../../domain-layer/classes/television');
let televisionTDG = require('../../data-source-layer/TDG/televisionTDG');

class televisionMapper {
    static find(id) {
        let television = televisionTDG.find(id);
        console.log(television);
    }

    static findAll() {
        let televisions = [];
        let alltelevisions = televisionTDG.findAll();
        console.log(alltelevisions);
    }

    static insert(televisionObject) {
        televisionTDG.insert(televisionObject.modelNumber, televisionObject.brand, televisionObject.dimensions,
            televisionObject.weight, televisionObject.price)
    }

    static update(televisionObject) {
        televisionTDG.update(televisionObject.modelNumber, televisionObject.brand, televisionObject.dimensions,
            televisionObject.weight, televisionObject.price)
    }

    static delete(televisionObject) {
        televisionTDG.delete(televisionObject.modelNumber);
    }
}

module.exports = televisionMapper;
