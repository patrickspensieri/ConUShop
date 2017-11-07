let chai = require('chai');
let expect = chai.expect;

let DesktopTDG = require('../../../../data-source-layer/TDG/DesktopTDG');

describe('Unit Tests: DesktopTDG class', function() {
    it('should be able to create objects using the class constructor', () => {
        let tdg = new DesktopTDG();
        expect(tdg).to.be.instanceOf(DesktopTDG);
        expect(tdg).to.be.an('object');
    });

    it('should have access to the static methods without instantiating an object', () => {
        expect(DesktopTDG.find).to.be.a('Function');
        expect(DesktopTDG.findAll).to.be.a('Function');
        expect(DesktopTDG.insert).to.be.a('Function');
        expect(DesktopTDG.update).to.be.a('Function');
        expect(DesktopTDG.delete).to.be.a('Function');
        expect(DesktopTDG.getDesktop).to.be.a('Function');
    });
});
