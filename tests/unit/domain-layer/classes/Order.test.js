let chai = require('chai');
let expect = chai.expect;

let Order = require('../../../../domain-layer/classes/Order');

describe('Unit Tests: Order class', function() {
    it('should be able to create objects using the class constructor', () => {
        let order = new Order('orderId', 'userId', 'orderDate', 1000);
        expect(order).to.be.instanceOf(Order);
        expect(order).to.be.an('object');
        expect(order).to.have.own.property('orderId');
        expect(order).to.have.own.property('userId');
        expect(order).to.have.own.property('orderDate');
        expect(order).to.have.own.property('total');
    });
});
