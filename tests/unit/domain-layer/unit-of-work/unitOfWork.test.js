let chai = require('chai');
let expect = chai.expect;
let assert = chai.assert;

let UnitOfWork = require('../../../../domain-layer/unit-of-work/unitOfWork');
let unitOfWork; // to be used as a global variable
let Computer = require('../../../../domain-layer/classes/products/Computer');

describe('Unit Tests: UnitOfWork class', function() {

    before((done) => {
        // create a global unit of work for all test cases
        unitOfWork = new UnitOfWork();
        done();
    });

    after((done) => {
        done();
    });

    it('should be able to create objects using the class constructor', () => {
        let uow = new UnitOfWork();
        expect(uow).to.be.instanceOf(UnitOfWork);
        expect(uow).to.be.an('object');
    });
});