let chai = require('chai');
let expect = chai.expect;

let ElectronicDevice = require('../../../../../domain-layer/classes/products/ElectronicDevice');

describe('Unit Tests: ElectronicDevice class', function() {
    it('should be able to create objects using the class constructor', () => {
        let electronicDevice = new ElectronicDevice('model', 'brand', 34, 100.99);
        expect(electronicDevice).to.be.instanceOf(ElectronicDevice);
        expect(electronicDevice).to.be.an('object');
        expect(electronicDevice).to.have.own.property('model');
        expect(electronicDevice).to.have.own.property('brand');
        expect(electronicDevice).to.have.own.property('weight');
        expect(electronicDevice).to.have.own.property('price');
    });
});
