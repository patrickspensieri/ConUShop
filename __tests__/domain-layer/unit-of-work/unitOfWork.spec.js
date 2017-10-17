let UnitOfWork = require('../../../domain-layer/unit-of-work/unitOfWork');
let Computer = require('../../../domain-layer/classes/computer');
let Desktop = require('../../../domain-layer/classes/desktop');

describe('domain-layer: Unit of Work class unit tests', () => {
    it('construstructor returns an object', () => {
        expect(new UnitOfWork()).toBeInstanceOf(Object);
    });

    it('two objects are properly added to the registered list', () => {
        let uow = new UnitOfWork();
        uow.registerNew(new Computer('1','2','3',4,5,6,'7',8,9));
        uow.registerNew(new Desktop('1','2','3',4,5,6,'7',8,9));
        expect(uow._newObjects.length).toEqual(2);
    });

    it('two objects are properly added to the deleted list', () => {
        let uow = new UnitOfWork();
        uow.registerDeleted(new Computer('1','2','3',4,5,6,'7',8,9));
        uow.registerDeleted(new Desktop('1','2','3',4,5,6,'7',8,9));
        expect(uow._deletedObjects.length).toEqual(2);
    });

    it('two objects are properly added to the dirty list', () => {
        let uow = new UnitOfWork();
        uow.registerDirty(new Computer('1','2','3',4,5,6,'7',8,9));
        uow.registerDirty(new Desktop('1','2','3',4,5,6,'7',8,9));
        expect(uow._dirtyObjects.length).toEqual(2);
    });

    it('unit of work internal methods', () => {
        let uow = new UnitOfWork();
        uow.registerNew(new Computer('1','2','3',4,5,6,'7',8,9));
        uow.registerNew(new Desktop('1','2','3',4,5,6,'7',8,9));
        expect(uow._newObjects.length).toEqual(2);
        uow.registerDirty(new Computer('1','2','3',4,5,6,'7',8,9));
        uow.registerDirty(new Desktop('1','2','3',4,5,6,'7',8,9));
        expect(uow._dirtyObjects.length).toEqual(2);
        uow.registerDeleted(new Computer('1','2','3',4,5,6,'7',8,9));
        uow.registerDeleted(new Desktop('1','2','3',4,5,6,'7',8,9));
        expect(uow._deletedObjects.length).toEqual(2);
        uow._clear();
        expect(uow._newObjects.length).toEqual(0);
        expect(uow._dirtyObjects.length).toEqual(0);
        expect(uow._deletedObjects.length).toEqual(0);
        expect(uow._afterCommit['new'].length).toEqual(2);
        expect(uow._afterCommit['dirty'].length).toEqual(2);
        expect(uow._afterCommit['deleted'].length).toEqual(2);
        uow._clear();
        expect(uow._afterCommit['new'].length).toEqual(0);
        expect(uow._afterCommit['dirty'].length).toEqual(0);
        expect(uow._afterCommit['deleted'].length).toEqual(0);
    });
});