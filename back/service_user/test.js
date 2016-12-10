var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is running.

var server = supertest.agent("http://localhost:3001");

// UNIT test begin

describe("SERVICE USER -  unit test",function(){

  // #1 should return home page


  it("Inscription - test",function(done){

    //calling ADD api
    server
    .get('/user')
    .expect("Content-type",/json/)
    .expect(200)
    .expect(function(res) {
        res.headers.data.email = 'test';
        res.headers.data.password = 'test';
        res.headers.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im5pY28iLCJtZHAiOiJqZW1hcGVsbGVjb21tZW50c3RqYW1lcyIsImlhdCI6MTQ4MTM5NzE0NywiZXhwIjoxNDgxNDgzNTQ3fQ.rujDbx0Uu_bwHBw9ynwnVIgMfY4kyagqlVEkFg25RLQ";
    })
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      done();
    });
  });

 

});