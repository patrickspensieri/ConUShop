let Admin = require('../../../../domain-layer/classes/Admin');
let Catalog = require('../../../../domain-layer/classes/ProductCatalog');

describe('domain-layer: Admin class unit tests', () => {
    it('construstructor returns an object', () => {
        expect(new Admin('fn', 'ln', 'ad', 'em', 123, 'pw', true)).toBeInstanceOf(Object);
    });

    it('admin has a product catalog', () => {
        let admin = new Admin('fn', 'ln', 'ad', 'em', 123, 'pw', true);
        expect(admin.getProductCatalog()).toBeInstanceOf(Catalog);
    });
});