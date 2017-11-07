let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;
const app = require('../../../../index');
let server;

let ProductCatalog = require('../../../../domain-layer/classes/ProductCatalog');
let productCatalog;

describe('Unit Tests: ProductCatalog class', function() {

    before((done) => {
        // creates a global product catalog for all the test cases on this file.
        productCatalog = ProductCatalog.getProductCatalogInstance();

        // starts the server
        server = app.app;
        done();
    });

    after((done) => {
        // closes the server
        done();
    });

    it('should create a product catalog object', () => {
        expect(productCatalog).to.be.instanceOf(ProductCatalog);
    });

    // it('should be able to use the addProductSpecification method to add product specifications', function* () {
    //     return yield expect(productCatalog.addProductSpecification('Desktop','DES303','Apple')).to.be.ok;
    // });

    // it('should be able to use the updateProductSpecification method to update product specifications', function* () {
    //     return yield expect(productCatalog.updateProductSpecification('Desktop','DES303','Windows')).to.be.ok;
    // });

    // it('should be able to use the getProductSpecification method to get a product specification', function* () {
    //     return yield expect(productCatalog.getProductSpecification('Desktop','DES303')).to.be.ok;
    // });

    // it('should be able to use the getAllProductSpecification method to get all product specifications', function* () {
    //     return yield expect(productCatalog.getAllProductSpecification('Desktop')).to.be.ok;
    // });

    // it('should be able to use the deleteProductSpecification method to delete product specifications', function* () {
    //     return yield expect(productCatalog.deleteProductSpecification('Desktop', 'DES303')).to.be.ok;
    // });
});
