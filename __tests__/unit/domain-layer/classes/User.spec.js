let User = require('../../../../domain-layer/classes/User');

describe('domain-layer: User class unit tests', () => {
    it('construstructor returns an object', () => {
        expect(new User('fn', 'ln', 'ad', 'em', 123, 'pw', true)).toBeInstanceOf(Object);
    });
});