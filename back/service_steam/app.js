var express = require('express');
var bodyParser  = require('body-parser');

var steam = require('./module/gestionSteam');
var	secure = require('./module/security');


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


app.get('/steam', steam.getInformationSteamByUser);

app.get('/logs', secure.securityToken);


app.listen(3003);
console.log('SERVICE STEAM - Listening on port 3003...');