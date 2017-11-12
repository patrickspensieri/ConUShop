let chai = require('chai');
let expect = chai.expect;

let PortableComputer = require('../../../../../domain-layer/classes/products/PortableComputer');

describe('Unit Tests: PortableComputer class', function() {
    it('should be able to create objects using the class constructor', () => {
        let portableComputer = new PortableComputer('model', 'brand', 22, 'processor', 12, 1000, 4, 'os', 'battery', 'camera', 'dimensions', 3, 1000.22);
        expect(portableComputer).to.be.instanceOf(PortableComputer);
        expect(portableComputer).to.be.an('object');
        expect(portableComputer).to.have.own.property('model');
        expect(portableComputer).to.have.own.property('brand');
        expect(portableComputer).to.have.own.property('display');
        expect(portableComputer).to.have.own.property('processor');
        expect(portableComputer).to.have.own.property('ram');
        expect(portableComputer).to.have.own.property('storage');
        expect(portableComputer).to.have.own.property('cores');
        expect(portableComputer).to.have.own.property('os');
        expect(portableComputer).to.have.own.property('battery');
        expect(portableComputer).to.have.own.property('camera');
        expect(portableComputer).to.have.own.property('dimensions');
        expect(portableComputer).to.have.own.property('weight');
        expect(portableComputer).to.have.own.property('price');
    });
});
