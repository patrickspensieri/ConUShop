let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;
const app = require('../../../../index');
let server;

let Admin = require('../../../../domain-layer/classes/Admin');
let ProductCatalog = require('../../../../domain-layer/classes/ProductCatalog');

describe('Unit Tests: Admin class', function() {

    before((done) => {
        // starts the server
        server = app.app;
        done();
    });

    after((done) => {
        // closes the server
        done();
    });

    it('should be able to create objects using the class constructor', () => {
        let admin = new Admin('fn', 'ln', 'ad', 'em', 123, 'pw', true);
        expect(admin).to.be.instanceOf(Admin);
        expect(admin).to.be.an('object');
        expect(admin).to.have.own.property('firstName');
        expect(admin).to.have.own.property('lastName');
        expect(admin).to.have.own.property('address');
        expect(admin).to.have.own.property('email');
        expect(admin).to.have.own.property('phone');
        expect(admin).to.have.own.property('password');
        expect(admin).to.have.own.property('isAdmin');
    });

    it('should have a productCatalog instance', () => {
        let admin = new Admin('fn', 'ln', 'ad', 'em', 123, 'pw', true);
        expect(admin.getProductCatalog()).to.be.instanceOf(ProductCatalog);
    });
});
