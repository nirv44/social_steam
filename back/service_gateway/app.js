var express = require('express');
var bodyParser  = require('body-parser');

var	user = require('./module/user');

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
 
// utilisation de la bdd pour le user
app.get('/user', user.add);
app.post('/user', user.findByEmailPassUser);


app.listen(3000);
console.log('Listening on port 3000...');