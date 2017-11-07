let chai = require('chai');
let expect = chai.expect;

let ProductCatalog = require('../../../../domain-layer/classes/ProductCatalog');
let productCatalog;

describe('Unit Tests: ProductCatalog class', function() {
    it('should create a product catalog object', () => {
        expect(ProductCatalog.getProductCatalogInstance()).to.be.instanceOf(ProductCatalog);
    });
});
