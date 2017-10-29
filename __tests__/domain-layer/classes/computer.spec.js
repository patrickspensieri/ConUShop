const Computer = require('../../../domain-layer/classes/products/Computer');

describe('domain-layer: Computer class unit tests', () => {
    it('construstructor returns an object', () => {
        expect(new Computer('1','2','3',4,5,6,'7',8,9)).toBeInstanceOf(Object);
    });

    it('construstructor sets the model field correctly', () => {
        expect(new Computer('1','2','3',4,5,6,'7',8,9).model).toEqual('1');
    });

    it('construstructor sets the brand field correctly', () => {
        expect(new Computer('1','2','3',4,5,6,'7',8,9).brand).toEqual('2');
    });

    it('construstructor sets the processor field correctly', () => {
        expect(new Computer('1','2','3',4,5,6,'7',8,9).processor).toEqual('3');
    });

    it('construstructor sets the ram field correctly', () => {
        expect(new Computer('1','2','3',4,5,6,'7',8,9).ram).toEqual(4);
    });

    it('construstructor sets the storage field correctly', () => {
        expect(new Computer('1','2','3',4,5,6,'7',8,9).storage).toEqual(5);
    });

    it('construstructor sets the ram field correctly', () => {
        expect(new Computer('1','2','3',4,5,6,'7',8,9).cores).toEqual(6);
    });

    it('construstructor sets the dimensions field correctly', () => {
        expect(new Computer('1','2','3',4,5,6,'7',8,9).dimensions).toEqual('7');
    });

    it('construstructor sets the weight field correctly', () => {
        expect(new Computer('1','2','3',4,5,6,'7',8,9).weight).toEqual(8);
    });

    it('construstructor sets the price field correctly', () => {
        expect(new Computer('1','2','3',4,5,6,'7',8,9).price).toEqual(9);
    });
});
