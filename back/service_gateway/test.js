var supertest = require("supertest");
var should = require("should");



////////////////////// DOC ////////////////
// https://www.npmjs.com/package/supertest



var server = supertest.agent("http://127.0.0.1:3000");

var token = "";

describe("SERVICE GATEWAY -  unit test",function(){



  it("INSCRIPTION - test",function(done){
    server
    .post('/inscription')
    .expect("Content-type",/json/)
    .expect(200)
    .send({"email":"test","password":"test"})
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      done();
    });
  });



  it("CONNEXION - test",function(done){

    server
    .post('/connexion')
    .expect("Content-type",/json/)
    .expect(200)
    .send({"email":"test","password":"test"})
    .end(function(err,res){

      res.status.should.equal(200);
      res.body.success.should.equal(true);
      token = res.body.token;
      res.body.should.have.property('token');

      done();
    });
  });


});