let chai = require('chai');
let expect = chai.expect;

let IdMap = require('../../../../domain-layer/identity-map/idMap');
let Admin = require('../../../../domain-layer/classes/Admin');
let Computer = require('../../../../domain-layer/classes/products/Computer');

describe('Unit Tests: idMap class', function() {

    it('should be able to create objects using the class constructor', () => {
        let idmap = new IdMap();
        expect(idmap).to.be.instanceOf(IdMap);
        expect(idmap).to.be.an('object');
    });

    it('should allow to add an user object to the idMap', () => {
        let idmap = new IdMap();
        let admin = new Admin('fn', 'ln', 'ad', 'em', 123, 'pw', true);

        idmap.add(admin, 'sid');
        expect(idmap._identityMap['User']['sid']).to.equal(admin);
    });

    it('should allow to add an electronic object to the idMap', () => {
        let idmap = new IdMap();
        let computer = new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18);

        idmap.add(computer, 'model');
        expect(idmap._identityMap['Computer']['model']).to.equal(computer);
    });

    it('should allow to update an user object from the idMap', () => {
        let idmap = new IdMap();
        let admin = new Admin('fn', 'ln', 'ad', 'em', 123, 'pw', true);

        // add an admin object to the idmap
        idmap.add(admin, 'sid');
        expect(idmap._identityMap['User']['sid']).to.equal(admin);

        // update the admin object
        admin.firstname = 'new first name';

        // add the updated item to the idmap
        idmap.update(admin, 'sid');
        expect(idmap._identityMap['User']['sid']).to.equal(admin);
        expect(idmap._identityMap['User']['sid'].firstname).to.equal('new first name');
    });

    
    it('should allow to update an electronic object from the idMap', () => {
        let idmap = new IdMap();
        let computer = new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18);
        
        // add a computer to the idmap
        idmap.add(computer, 'model');
        expect(idmap._identityMap['Computer']['model']).to.equal(computer);

        // update the computer
        computer.price = 3200;

        // add the updated item to the idmap
        idmap.update(computer, 'model');
        expect(idmap._identityMap['Computer']['model']).to.equal(computer);
        expect(idmap._identityMap['Computer']['model'].price).to.equal(3200);
    });

    it('should allow to delete an user object from the idMap', () => {
        let idmap = new IdMap();
        let admin = new Admin('fn', 'ln', 'ad', 'em', 123, 'pw', true);

        // add an admin object to the idmap
        idmap.add(admin, 'sid');
        expect(idmap._identityMap['User']['sid']).to.equal(admin);

        // delete the item from the idmap
        idmap.delete(admin, 'sid');
        expect(idmap._identityMap['User']['sid']).to.equal(undefined);
    });

    it('should allow to delete an electronic object from the idMap', () => {
        let idmap = new IdMap();
        let computer = new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18);
        
        // add a computer to the idmap
        idmap.add(computer, 'model');
        expect(idmap._identityMap['Computer']['model']).to.equal(computer);

        // delete the item from the idmap
        idmap.delete(computer, 'model');
        expect(idmap._identityMap['Computer']['model']).to.equal(undefined);
    });

    it('should allow to get an user object from the idMap', () => {
        let idmap = new IdMap();
        let admin = new Admin('fn', 'ln', 'ad', 'em', 123, 'pw', true);

        // add an admin object to the idmap
        idmap.add(admin, 'sid');
        expect(idmap._identityMap['User']['sid']).to.equal(admin);

        // get the item from the idmap
        expect(idmap.get('User', 'sid')).to.equal(admin);
    });

    it('should allow to get an electronic object from the idMap', () => {
        let idmap = new IdMap();
        let computer = new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18);
        
        // add a computer to the idmap
        idmap.add(computer, 'model');
        expect(idmap._identityMap['Computer']['model']).to.equal(computer);

        // get the item from the idmap
        expect(idmap.get('Computer', 'model')).to.equal(computer);
    });
});