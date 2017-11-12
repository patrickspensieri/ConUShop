let chai = require('chai');
let expect = chai.expect;

let ShoppingCart = require('../../../../domain-layer/classes/ShoppingCart');
let Client = require('../../../../domain-layer/classes/Client');
let Admin = require('../../../../domain-layer/classes/Admin');
let ProductCatalog = require('../../../../domain-layer/classes/ProductCatalog');

describe('Unit Tests: ShoppingCart class', function() {
    it('should be able to create objects using the class constructor', () => {
        let client = new Client('fn', 'ln', 'ad', 'em', 123, 'pw', false);
        let catalog = ProductCatalog.getProductCatalogInstance();
        let cart = new ShoppingCart(catalog, client);
        expect(cart).to.be.instanceOf(ShoppingCart);
        expect(cart).to.be.an('object');
        expect(cart).to.have.own.property('productCatalog');
    });

    it('should not allow admins to create a shopping cart object', () => {
        let admin = new Admin('fn', 'ln', 'ad', 'em', 123, 'pw', true);
        let catalog = ProductCatalog.getProductCatalogInstance();

        // throws error when shopping cart is instantiated with an admin
        expect(() => new ShoppingCart(catalog, admin)).to.throw();
    });
});
