"use strict";
var express = require('express');
var bodyParser  = require('body-parser');
var swagger = require('swagger-express');

var	user = require('./module/user_gateway');

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



app.post('/inscription', user.Inscription);
app.post('/connexion', user.Connexion);
app.put('/user/:iduser', user.modifierCompte);


app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: 'http://localhost:3000',
    swaggerURL: '/swagger',
    swaggerUI: './public/swagger/',
    apis: ['./module/user_gateway.js']
}));


app.listen(3000);
console.log('SERVICE GATEWAY - Listening on port 3000...');
console.log('SERVICE GATEWAY - DOC : /swagger');