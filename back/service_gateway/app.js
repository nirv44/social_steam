var express = require('express');
var bodyParser  = require('body-parser');


var	user = require('./module/user_gateway');
//var	a = require('./module/security_inter_service');

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



app.post('/user', user.Inscription);
app.post('/user', user.Connexion);
app.put('/user/:iduser', user.modifierCompte);






// test a supprimer
//app.get('/test', a.test);


app.listen(3000);
console.log('SREVICE GATEWAY - Listening on port 3000...');