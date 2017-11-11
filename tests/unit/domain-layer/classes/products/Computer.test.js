let chai = require('chai');
let expect = chai.expect;

let Computer = require('../../../../../domain-layer/classes/products/Computer');

describe('Unit Tests: Computer class', function() {
    it('should be able to create objects using the class constructor', () => {
        let computer = new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18);
        expect(computer).to.be.instanceOf(Computer);
        expect(computer).to.be.an('object');
        expect(computer).to.have.own.property('model');
        expect(computer).to.have.own.property('brand');
        expect(computer).to.have.own.property('processor');
        expect(computer).to.have.own.property('ram');
        expect(computer).to.have.own.property('storage');
        expect(computer).to.have.own.property('dimensions');
        expect(computer).to.have.own.property('weight');
        expect(computer).to.have.own.property('price');
    });
});
