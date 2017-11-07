let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;
const app = require('../../../../index');
let server;

let Client = require('../../../../domain-layer/classes/Client');
let ProductCatalog = require('../../../../domain-layer/classes/ProductCatalog');

describe('Unit Tests: Client class', function() {
    it('should be able to create objects using the class constructor', () => {
        let client = new Client('fn', 'ln', 'ad', 'em', 123, 'pw', false);
        expect(client).to.be.instanceOf(Client);
        expect(client).to.be.an('object');
        expect(client).to.have.own.property('firstName');
        expect(client).to.have.own.property('lastName');
        expect(client).to.have.own.property('address');
        expect(client).to.have.own.property('email');
        expect(client).to.have.own.property('phone');
        expect(client).to.have.own.property('password');
        expect(client).to.have.own.property('isAdmin');
    });

    it('should have the getProductInventory function', () => {
        let client = new Client('fn', 'ln', 'ad', 'em', 123, 'pw', false);
        expect(client.getProductInventory).to.be.a('Function');
    });
});
