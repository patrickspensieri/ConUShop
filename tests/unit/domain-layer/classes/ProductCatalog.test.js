let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;
let ProductCatalog = require('../../../../domain-layer/classes/ProductCatalog');
const app = require('../../../../index');
let server;

describe('Unit Tests: ProductCatalog class', function() {

    before((done) => {
        // starts the server
        server = app.app;
        done();
    });

    after((done) => {
        // closes the server
        done();
    });

    it('should create a product catalog object', () => {
        let productCatalog = ProductCatalog.getProductCatalogInstance();
        expect(productCatalog).to.be.instanceOf(ProductCatalog);
    });
});
