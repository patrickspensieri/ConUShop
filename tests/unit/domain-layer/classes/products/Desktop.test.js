let chai = require('chai');
let expect = chai.expect;

let Desktop = require('../../../../../domain-layer/classes/products/Desktop');

describe('Unit Tests: Desktop class', function() {
    it('should be able to create objects using the class constructor', () => {
        let desktop = new Desktop('model', 'brand', 'processor', 16, 1000, 8, 'dimensions', 2, 8000.99);
        expect(desktop).to.be.instanceOf(Desktop);
        expect(desktop).to.be.an('object');
        expect(desktop).to.have.own.property('model');
        expect(desktop).to.have.own.property('brand');
        expect(desktop).to.have.own.property('processor');
        expect(desktop).to.have.own.property('ram');
        expect(desktop).to.have.own.property('storage');
        expect(desktop).to.have.own.property('dimensions');
        expect(desktop).to.have.own.property('weight');
        expect(desktop).to.have.own.property('price');
    });
});
