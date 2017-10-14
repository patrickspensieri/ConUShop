const Monitor = require('../../../domain-layer/classes/products/Monitor');

describe('domain-layer: Monitor class unit tests', () => {
    it('construstructor returns an object', () => {
        expect(new Monitor('1','2',3,4,5)).toBeInstanceOf(Object);
    });

    it('construstructor sets the model field correctly', () => {
        expect(new Monitor('1','2',3,4,5).model).toEqual('1');
    });

    it('construstructor sets the brand field correctly', () => {
        expect(new Monitor('1','2',3,4,5).brand).toEqual('2');
    });

    it('construstructor sets the size field correctly', () => {
        expect(new Monitor('1','2',3,4,5).size).toEqual(3);
    });

    it('construstructor sets the weight field correctly', () => {
        expect(new Monitor('1','2',3,4,5).weight).toEqual(4);
    });

    it('construstructor sets the price field correctly', () => {
        expect(new Monitor('1','2',3,4,5).price).toEqual(5);
    });
});