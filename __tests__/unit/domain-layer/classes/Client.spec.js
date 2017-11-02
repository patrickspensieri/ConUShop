let Client = require('../../../../domain-layer/classes/Client');
let Catalog = require('../../../../domain-layer/classes/ProductCatalog');

describe('domain-layer: Client class unit tests', () => {
    it('construstructor returns an object', () => {
        expect(new Client('fn', 'ln', 'ad', 'em', 123, 'pw', true)).toBeInstanceOf(Object);
    });
});