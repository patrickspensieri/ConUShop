const PortableComputer = require('../../../core/products/PortableComputer');

describe('domain-layer: PortableComputer class unit tests', () => {
    it('construstructor returns an object', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13)).toBeInstanceOf(Object);
    });

    it('construstructor sets the model field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).model).toEqual('1');
    });

    it('construstructor sets the brand field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).brand).toEqual('2');
    });

    it('construstructor sets the display field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).display).toEqual(3);
    });

    it('construstructor sets the processor field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).processor).toEqual('4');
    });

    it('construstructor sets the ram field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).ram).toEqual(5);
    });

    it('construstructor sets the storage field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).storage).toEqual(6);
    });

    it('construstructor sets the cores field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).cores).toEqual(7);
    });

    it('construstructor sets the os field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).os).toEqual('8');
    });

    it('construstructor sets the battery field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).battery).toEqual('9');
    });

    it('construstructor sets the camera field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).camera).toEqual('10');
    });

    it('construstructor sets the dimensions field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).dimensions).toEqual('11');
    });

    it('construstructor sets the weight field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).weight).toEqual(12);
    });

    it('construstructor sets the price field correctly', () => {
        expect(new PortableComputer('1','2',3,'4',5,6,7,'8','9','10','11',12,13).price).toEqual(13);
    });
});