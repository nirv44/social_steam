"use strict";
var express = require('express');
var bodyParser  = require('body-parser');
var swagger = require('swagger-express');

var	user = require('./module/user_gateway');

var app = express();
var port = process.env.PORT || 3000;


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


app.post('/inscription', user.Inscription);
app.post('/connexion', user.Connexion);
app.put('/user/:iduser', user.modifierCompte);
app.post('/roll', user.checkifplaying);


app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: 'https://servicegateway.herokuapp.com',
    swaggerURL: '/swagger',
    swaggerUI: './public/swagger/',
    apis: ['./module/user_gateway.js']
}));


app.listen(port);
console.log('SERVICE GATEWAY - Listening on port ' + port + '...');
console.log('SERVICE GATEWAY - DOC : /swagger');