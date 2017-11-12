let chai = require('chai');
let expect = chai.expect;

let Client = require('../../../../domain-layer/classes/Client');
let ProductCatalog = require('../../../../domain-layer/classes/ProductCatalog');

describe('Unit Tests: Client class', function() {
    it('should be able to create objects using the class constructor', () => {
        let client = new Client('fn', 'ln', 'ad', 'em', 123, 'pw', false);
        expect(client).to.be.instanceOf(Client);
        expect(client).to.be.an('object');
        expect(client).to.have.own.property('firstname');
        expect(client).to.have.own.property('lastname');
        expect(client).to.have.own.property('address');
        expect(client).to.have.own.property('email');
        expect(client).to.have.own.property('phone');
        expect(client).to.have.own.property('password');
        expect(client).to.have.own.property('isadmin');
    });

    it('should have the getProductInventory function', () => {
        let client = new Client('fn', 'ln', 'ad', 'em', 123, 'pw', false);
        expect(client.getProductInventory).to.be.a('Function');
    });
});
