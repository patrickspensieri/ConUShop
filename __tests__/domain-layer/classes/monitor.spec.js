const monitor = require('../../../domain-layer/classes/monitor');

describe('domain-layer: monitor class unit tests', () => {
    it('construstructor returns an object', () => {
        expect(new monitor('1','2',3,4,5)).toBeInstanceOf(Object);
    });

    it('construstructor sets the modelNumber field correctly', () => {
        expect(new monitor('1','2',3,4,5).modelNumber).toEqual('1');
    });

    it('construstructor sets the brand field correctly', () => {
        expect(new monitor('1','2',3,4,5).brand).toEqual('2');
    });

    it('construstructor sets the size field correctly', () => {
        expect(new monitor('1','2',3,4,5).size).toEqual(3);
    });

    it('construstructor sets the weight field correctly', () => {
        expect(new monitor('1','2',3,4,5).weight).toEqual(4);
    });

    it('construstructor sets the price field correctly', () => {
        expect(new monitor('1','2',3,4,5).price).toEqual(5);
    });
});