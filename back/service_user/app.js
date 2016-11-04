var express = require('express');
var bodyParser  = require('body-parser');

var	bdd = require('./module/bddmysql');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options('/api/*', function (request, response, next) {
    response.header("Access-Control-Allow-Methods", "GET, POST");
    response.send();
});
 

app.get('/user', bdd.findByEmailPassUser);
app.post('/user', bdd.addUser);
app.put('/user/:id', bdd.updateUser);

app.delete('/logs', bdd.securityToken);


app.listen(3001);
console.log('Listening on port 3001...');