let chai = require('chai');
let expect = chai.expect;

let Monitor = require('../../../../../domain-layer/classes/products/Monitor');

describe('Unit Tests: Monitor class', function() {
    it('should be able to create objects using the class constructor', () => {
        let monitor = new Monitor('model', 'brand', 22, 12, 1000);
        expect(monitor).to.be.instanceOf(Monitor);
        expect(monitor).to.be.an('object');
        expect(monitor).to.have.own.property('model');
        expect(monitor).to.have.own.property('brand');
        expect(monitor).to.have.own.property('size');
        expect(monitor).to.have.own.property('weight');
        expect(monitor).to.have.own.property('price');
    });
});
