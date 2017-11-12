let chai = require('chai');
let expect = chai.expect;

let UnitOfWork = require('../../../../domain-layer/unit-of-work/unitOfWork');
let Computer = require('../../../../domain-layer/classes/products/Computer');

describe('Unit Tests: UnitOfWork class', function() {

    it('should be able to create objects using the class constructor', () => {
        let uow = new UnitOfWork();
        expect(uow).to.be.instanceOf(UnitOfWork);
        expect(uow).to.be.an('object');
    });
    
    it('should be able to register new objects to the unit of work', () => {
        let uow = new UnitOfWork();
        expect(uow._newObjects.length).to.equal(0);
        uow.registerNew(new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18));
        expect(uow._newObjects.length).to.equal(1);
    });

    it('should not allow to register the same new object twice', () => {
        let uow = new UnitOfWork();
        let computer = new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18);

        // initially the uow is empty
        expect(uow._newObjects.length).to.equal(0);

        // a computer object was added to the uow
        uow.registerNew(computer);

        // adding the same object again breaks the precondition
        // and throws an execption
        expect(() => uow.registerNew(computer)).to.throw('cant register a obj new twice');
    });

    it('should not allow to register a dirty object as new', () => {
        let uow = new UnitOfWork();
        let computer = new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18);

        expect(uow._dirtyObjects.length).to.equal(0);
        uow.registerDirty(computer);
        expect(uow._dirtyObjects.length).to.equal(1);

        expect(() => uow.registerNew(computer)).to.throw('cant register a dirty obj as new');
    });

    it('should not allow to register a deleted object as new', () => {
        let uow = new UnitOfWork();
        let computer = new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18);

        expect(uow._deletedObjects.length).to.equal(0);
        uow.registerDeleted(computer);
        expect(uow._deletedObjects.length).to.equal(1);

        expect(() => uow.registerNew(computer)).to.throw('cant register a removed obj as new');
    });

    it('should not allow to register a null object as new', () => {
        let uow = new UnitOfWork();
        expect(() => uow.registerNew(null)).to.throw();
    });

    it('should be able to register dirty objects to the unit of work', () => {
        let uow = new UnitOfWork();
        expect(uow._dirtyObjects.length).to.equal(0);
        uow.registerDirty(new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18));
        expect(uow._dirtyObjects.length).to.equal(1);
    });

    it('should not allow to register a null object as dirty', () => {
        let uow = new UnitOfWork();
        expect(() => uow.registerDirty(null)).to.throw();
    });

    it('should not allow to register a deleted object as dirty', () => {
        let uow = new UnitOfWork();
        let computer = new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18);

        expect(uow._deletedObjects.length).to.equal(0);
        uow.registerDeleted(computer);
        expect(uow._deletedObjects.length).to.equal(1);

        expect(() => uow.registerDirty(computer)).to.throw('cant register a removed obj as dirty');
    });

    it('should be able to register deleted objects to the unit of work', () => {
        let uow = new UnitOfWork();
        expect(uow._deletedObjects.length).to.equal(0);
        uow.registerDeleted(new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18));
        expect(uow._deletedObjects.length).to.equal(1);
    });
  
    it('should not allow to register a null object as deleted', () => {
        let uow = new UnitOfWork();
        expect(() => uow.registerDeleted(null)).to.throw();
    });

    it('should not allow to register a deleted object as deleted', () => {
        let uow = new UnitOfWork();
        let computer = new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18);

        expect(uow._deletedObjects.length).to.equal(0);
        uow.registerDeleted(computer);
        expect(uow._deletedObjects.length).to.equal(1);

        expect(() => uow.registerDeleted(computer)).to.throw('cant register a removed obj as dirty');
    });

    it('should bring back the committed objects to memory with the rollback method', () => {
        let uow = new UnitOfWork();

        expect(uow._deletedObjects.length).to.equal(0);
        uow.registerDeleted(new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18));
        uow.registerDeleted(new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18));
        uow.registerDeleted(new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18));
        expect(uow._deletedObjects.length).to.equal(3);

        expect(uow._dirtyObjects.length).to.equal(0);
        uow.registerDirty(new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18));
        uow.registerDirty(new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18));
        uow.registerDirty(new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18));
        expect(uow._dirtyObjects.length).to.equal(3);

        expect(uow._newObjects.length).to.equal(0);
        uow.registerNew(new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18));
        uow.registerNew(new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18));
        uow.registerNew(new Computer('model', 'brand', 'processor', 16, 1000, 4, 'dimensions', 34, 3400.18));
        expect(uow._newObjects.length).to.equal(3);

        uow._clear();
        expect(uow._newObjects.length).to.equal(0);
        expect(uow._deletedObjects.length).to.equal(0);
        expect(uow._dirtyObjects.length).to.equal(0);

        uow.rollback();
        expect(uow._deletedObjects.length).to.equal(3);
        expect(uow._dirtyObjects.length).to.equal(3);
        expect(uow._deletedObjects.length).to.equal(3);
    });
});