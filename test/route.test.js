var supertest = require("supertest");
var should = require("should");

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8100;

var server = supertest.agent(`http://localhost:${PORT}`);

// UNIT test begin
describe("GET Request",function(){

  it("",function(done){

    // calling api
    server.get("/healthz")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

});