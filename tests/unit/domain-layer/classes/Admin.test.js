let chai = require('chai');
let expect = chai.expect;

let Admin = require('../../../../domain-layer/classes/Admin');
let ProductCatalog = require('../../../../domain-layer/classes/ProductCatalog');

describe('Unit Tests: Admin class', function() {
    it('should be able to create objects using the class constructor', () => {
        let admin = new Admin('fn', 'ln', 'ad', 'em', 123, 'pw', true);
        expect(admin).to.be.instanceOf(Admin);
        expect(admin).to.be.an('object');
        expect(admin).to.have.own.property('firstname');
        expect(admin).to.have.own.property('lastname');
        expect(admin).to.have.own.property('address');
        expect(admin).to.have.own.property('email');
        expect(admin).to.have.own.property('phone');
        expect(admin).to.have.own.property('password');
        expect(admin).to.have.own.property('isadmin');
    });

    it('should have a productCatalog instance', () => {
        let admin = new Admin('fn', 'ln', 'ad', 'em', 123, 'pw', true);
        expect(admin.getProductCatalog()).to.be.instanceOf(ProductCatalog);
    });
});
