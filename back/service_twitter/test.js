var supertest = require("supertest");
var should = require("should");



////////////////////// DOC ////////////////
// https://www.npmjs.com/package/supertest



var server = supertest.agent("http://127.0.0.1:3002");


describe("SERVICE TWITTER -  unit test",function(){

  it("Envoyer un tweet - test",function(done){
    server
    .post('/sendtweet')
    .expect("Content-type",/json/)
    .expect(200)
    .send({"iduser":"1","tweet":"test"})
    .set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im5pY28iLCJtZHAiOiJqZW1hcGVsbGVjb21tZW50c3RqYW1lcyIsImlhdCI6MTQ4MTQ2NTAyMywiZXhwIjoxNDgxNTUxNDIzfQ.I9Hzv83bbQRIzOmpzCrOJVxqKmPbhWkkQR6PfMqbuJU")
    .end(function(err,res){
      console.log(res.body);
      res.body.success.should.equal(true);
      done();
    });
  });


});