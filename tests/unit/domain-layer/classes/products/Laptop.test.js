let chai = require('chai');
let expect = chai.expect;

let Laptop = require('../../../../../domain-layer/classes/products/Laptop');

describe('Unit Tests: Laptop class', function() {
    it('should be able to create objects using the class constructor', () => {
        let laptop = new Laptop('model', 'brand', 22, 'processor', 12, 1000, 4, 'os', 'battery', 'camera', false, 'dimensions', 3, 1000.22);
        expect(laptop).to.be.instanceOf(Laptop);
        expect(laptop).to.be.an('object');
        expect(laptop).to.have.own.property('model');
        expect(laptop).to.have.own.property('brand');
        expect(laptop).to.have.own.property('display');
        expect(laptop).to.have.own.property('processor');
        expect(laptop).to.have.own.property('ram');
        expect(laptop).to.have.own.property('storage');
        expect(laptop).to.have.own.property('cores');
        expect(laptop).to.have.own.property('os');
        expect(laptop).to.have.own.property('battery');
        expect(laptop).to.have.own.property('camera');
        expect(laptop).to.have.own.property('touch');
        expect(laptop).to.have.own.property('dimensions');
        expect(laptop).to.have.own.property('weight');
        expect(laptop).to.have.own.property('price');
    });
});
