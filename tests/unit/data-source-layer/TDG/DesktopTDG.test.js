let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;
const app = require('../../../../index');
let server;

let DesktopTDG = require('../../../../data-source-layer/TDG/DesktopTDG');

describe('Unit Tests: DesktopTDG class', function() {

    before((done) => {
        // starts the server
        server = app.app;
        done();
    });

    after((done) => {
        // closes the server
        done();
    });

    // it('should be able instert a new desktop object to the desktop table', function* () {
    //     return yield expect(DesktopTDG.insert('DES15','Dell','Intel i7',12,1000,4,'15.22 x 36.72 x 29.87','11.54',1301.09)).to.eventually.be.not.null();
    // });
});
