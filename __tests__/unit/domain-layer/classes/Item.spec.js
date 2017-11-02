let Item = require('../../../../domain-layer/classes/Item');

describe('domain-layer: Item class unit tests', () => {
    it('construstructor returns an object', () => {
        expect(new Item('serialNumber', 'modelNumber')).toBeInstanceOf(Object);
    });
});