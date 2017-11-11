let chai = require('chai');
let expect = chai.expect;

let Tablet = require('../../../../../domain-layer/classes/products/Tablet');

describe('Unit Tests: Tablet class', function() {
    it('should be able to create objects using the class constructor', () => {
        let tablet = new Tablet('model', 'brand', 22, 'processor', 12, 1000, 4, 'os', 'battery', 'camera', 'dimensions', 3, 1000.22);
        expect(tablet).to.be.instanceOf(Tablet);
        expect(tablet).to.be.an('object');
        expect(tablet).to.have.own.property('model');
        expect(tablet).to.have.own.property('brand');
        expect(tablet).to.have.own.property('display');
        expect(tablet).to.have.own.property('processor');
        expect(tablet).to.have.own.property('ram');
        expect(tablet).to.have.own.property('storage');
        expect(tablet).to.have.own.property('cores');
        expect(tablet).to.have.own.property('os');
        expect(tablet).to.have.own.property('battery');
        expect(tablet).to.have.own.property('camera');
        expect(tablet).to.have.own.property('dimensions');
        expect(tablet).to.have.own.property('weight');
        expect(tablet).to.have.own.property('price');
    });
});
