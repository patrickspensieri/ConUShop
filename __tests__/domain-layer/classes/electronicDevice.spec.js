const electronicDevice = require('../../../domain-layer/classes/electronicDevice');

describe('domain-layer: electronicDevice class unit tests', () => {
    it('construstructor returns an object', () => {
        expect(new electronicDevice('1','2',3,4)).toBeInstanceOf(Object);
    });

    it('construstructor sets the modelNumber field correctly', () => {
        expect(new electronicDevice('1','2',3,4).modelNumber).toEqual('1');
    });

    it('construstructor sets the brand field correctly', () => {
        expect(new electronicDevice('1','2',3,4).brand).toEqual('2');
    });

    it('construstructor sets the weight field correctly', () => {
        expect(new electronicDevice('1','2',3,4).weight).toEqual(3);
    });

    it('construstructor sets the price field correctly', () => {
        expect(new electronicDevice('1','2',3,4).price).toEqual(4);
    });
});