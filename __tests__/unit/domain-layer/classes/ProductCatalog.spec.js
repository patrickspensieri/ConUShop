let ProductCatalog = require('../../../../domain-layer/classes/ProductCatalog');

describe('domain-layer: ProductCatalog class unit tests', () => {
    it('construstructor returns an object', () => {
        expect(ProductCatalog.getProductCatalogInstance()).toBeInstanceOf(Object);
    });
});