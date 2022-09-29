var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:8000");

// UNIT test begin
describe("GET Request",function(){

  it("Welcome to node app",function(done){

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