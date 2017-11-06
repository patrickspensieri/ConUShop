let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let request = require('supertest');
chai.use(chaiAsPromised);
let expect = chai.expect;
const app = require('../../index');
let server;

describe('Integration Tests: Client API', function() {

    before((done) => {
        // starts the server
        server = app.app;
        done();
    });

    after((done) => {
        // closes the server
        done();
    });

    describe('#GET /register', function() { 
          it('should get all tasks', function(done) { 
            request(server).get('/login')
              .end(function(err, res) { 
                console.log(res.body);
                expect(res.body).to.be.an('array'); 
                expect(res.body).to.be.empty; 
                done(); 
            }); 
        });
    });
});
