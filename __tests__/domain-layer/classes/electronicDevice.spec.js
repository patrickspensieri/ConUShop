const ElectronicDevice = require('../../../domain-layer/classes/products/ElectronicDevice');

describe('domain-layer: ElectronicDevice class unit tests', () => {
    it('construstructor returns an object', () => {
        expect(new ElectronicDevice('1','2',3,4)).toBeInstanceOf(Object);
    });

    it('construstructor sets the model field correctly', () => {
        expect(new ElectronicDevice('1','2',3,4).model).toEqual('1');
    });

    it('construstructor sets the brand field correctly', () => {
        expect(new ElectronicDevice('1','2',3,4).brand).toEqual('2');
    });

    it('construstructor sets the weight field correctly', () => {
        expect(new ElectronicDevice('1','2',3,4).weight).toEqual(3);
    });

    it('construstructor sets the price field correctly', () => {
        expect(new ElectronicDevice('1','2',3,4).price).toEqual(4);
    });
});