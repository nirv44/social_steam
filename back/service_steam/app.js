"use strict";
var express = require('express');
var bodyParser  = require('body-parser');
var swagger = require('swagger-express');

var bdd = require('./module/bddmysql');
var steam = require('./module/gestionSteam');
var	secure = require('./module/security');


var app = express();
var port = process.env.PORT || 3003;


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

app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: 'http://localhost:' + port,
    swaggerURL: '/swagger',
    swaggerUI: './public/swagger/',
    apis: ['./module/gestionSteam.js','./module/security.js']
}));


app.get('/steam/:iduser', steam.getInformationSteamByUser);
app.get('/logs', secure.securityToken);


app.listen(port);
console.log('SERVICE STEAM - Listening on port ' + port + '...');
console.log('SERVICE STEAM - DOC : /swagger');