var supertest = require("supertest");
var should = require("should");



////////////////////// DOC ////////////////
// https://www.npmjs.com/package/supertest



var server = supertest.agent("http://127.0.0.1:3001");


describe("SERVICE USER -  unit test",function(){

  it("INSCRIPTION - test 1",function(done){
    server
    .post('/user')
    .expect("Content-type",/json/)
    .expect(200)
    .set('data', '{"email":"test","password":"test"}')
    .set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im5pY28iLCJtZHAiOiJqZW1hcGVsbGVjb21tZW50c3RqYW1lcyIsImlhdCI6MTQ4MTM5NzE0NywiZXhwIjoxNDgxNDgzNTQ3fQ.rujDbx0Uu_bwHBw9ynwnVIgMfY4kyagqlVEkFg25RLQ")
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      done();
    });
  });

  it("INSCRIPTION - test 2",function(done){
    server
    .post('/user')
    .expect("Content-type",/json/)
    .expect(200)
    .set('data', '')
    .set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im5pY28iLCJtZHAiOiJqZW1hcGVsbGVjb21tZW50c3RqYW1lcyIsImlhdCI6MTQ4MTM5NzE0NywiZXhwIjoxNDgxNDgzNTQ3fQ.rujDbx0Uu_bwHBw9ynwnVIgMfY4kyagqlVEkFg25RLQ")
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(false);
      done();
    });
  });

  it("INSCRIPTION - test 3",function(done){
    server
    .post('/user')
    .expect("Content-type",/json/)
    .expect(200)
    .set('data', '{"email":"test","password":"test"}')
    .set('token',"")
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(false);
      done();
    });
  });


  it("CONNEXION - test 1",function(done){

    server
    .get('/user')
    .expect("Content-type",/json/)
    .expect(200)
    .set('data', '{"email":"test","password":"test"}')
    .set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im5pY28iLCJtZHAiOiJqZW1hcGVsbGVjb21tZW50c3RqYW1lcyIsImlhdCI6MTQ4MTM5NzE0NywiZXhwIjoxNDgxNDgzNTQ3fQ.rujDbx0Uu_bwHBw9ynwnVIgMfY4kyagqlVEkFg25RLQ")
    .end(function(err,res){
      res.status.should.equal(200);

      res.body.should.have.property('id');

      res.body.should.have.property('email');
      res.body.email.should.equal("test");
      res.body.should.have.property('password');
      res.body.password.should.equal("test");

      res.body.should.have.property('steam_api_key');
      res.body.should.have.property('steam_id');
      res.body.should.have.property('consumer_key');
      res.body.should.have.property('consumer_secret');
      res.body.should.have.property('access_token_key');
      res.body.should.have.property('access_token_secret');

      done();
    });
  });

  it("CONNEXION - test 2",function(done){

    server
    .get('/user')
    .expect("Content-type",/json/)
    .expect(200)
    .set('data', '')
    .set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im5pY28iLCJtZHAiOiJqZW1hcGVsbGVjb21tZW50c3RqYW1lcyIsImlhdCI6MTQ4MTM5NzE0NywiZXhwIjoxNDgxNDgzNTQ3fQ.rujDbx0Uu_bwHBw9ynwnVIgMfY4kyagqlVEkFg25RLQ")
    .end(function(err,res){
      res.status.should.equal(200);

      
      res.body.success.should.equal(false);

      done();
    });
  });


  it("CONNEXION - test 3",function(done){

    server
    .get('/user')
    .expect("Content-type",/json/)
    .expect(200)
    .set('data', '{"email":"test","password":"test"}')
    .set('token',"")
    .end(function(err,res){
      res.status.should.equal(200);

      
      res.body.success.should.equal(false);

      done();
    });
  });

  it("LOGS - test 3",function(done){

    server
    .get('/user')
    .expect("Content-type",/json/)
    .expect(200)
    .set('data', '{"email":"test","password":"test"}')
    .set('token',"")
    .end(function(err,res){
      res.status.should.equal(200);

      
      res.body.success.should.equal(false);

      done();
    });
  });

});