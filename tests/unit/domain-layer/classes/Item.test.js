let chai = require('chai');
let expect = chai.expect;

let Item = require('../../../../domain-layer/classes/Item');

describe('Unit Tests: Item class', function() {
    it('should be able to create objects using the class constructor', () => {
        let item = new Item('serialNumber','modelNumber');
        expect(item).to.be.instanceOf(Item);
        expect(item).to.be.an('object');
        expect(item).to.have.own.property('serialNumber');
        expect(item).to.have.own.property('modelNumber');
    });
});
