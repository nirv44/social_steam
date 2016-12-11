var supertest = require("supertest");
var should = require("should");



////////////////////// DOC ////////////////
// https://www.npmjs.com/package/supertest



var server = supertest.agent("http://127.0.0.1:3003");


describe("SERVICE STEAM -  unit test",function(){

  it("Infos du compte steam - test",function(done){
    server
    .get('/steam/1')
    .expect("Content-type",/json/)
    .expect(200)
    .set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im5pY28iLCJtZHAiOiJqZW1hcGVsbGVjb21tZW50c3RqYW1lcyIsImlhdCI6MTQ4MTQ2NTAyMywiZXhwIjoxNDgxNTUxNDIzfQ.I9Hzv83bbQRIzOmpzCrOJVxqKmPbhWkkQR6PfMqbuJU")
    .end(function(err,res){
      console.log("Si un les données liée a steam ne son pas valide on ne peut valider ce test (données a ajouter au moment de l'inscription)");
      res.body.success.should.equal(true);
      res.body.should.have.property('data');
      done();
    });
  });

  it("LOGS - test 1",function(done){
    server
    .get('/logs')
    .expect("Content-type",/json/)
    .expect(200)
    .set('data', '{"login":"nico","mdp":"jemapellecommentstjames"}')
    .end(function(err,res){
      res.status.should.equal(200);

      res.body.success.should.equal(true);

      res.body.should.have.property('token');

      done();
    });
  });


  it("LOGS - test 2",function(done){
    server
    .get('/logs')
    .expect("Content-type",/json/)
    .expect(200)
    .set('data', '{"login":"","mdp":""}')
    .end(function(err,res){
      res.status.should.equal(200);

      res.body.success.should.equal(false);

      done();
    });
  });


});              
