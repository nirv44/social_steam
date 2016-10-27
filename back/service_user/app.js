var express = require('express');
var bodyParser  = require('body-parser');

var	bdd = require('./module/bddmysql');
var	twitter = require('./lib/gestionTwitter');


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
app.get('/user', bdd.findByEmailpassUser);
app.post('/user', bdd.addUser);

// utilisation de la bdd mysql pour les archives
app.get('/archive/:iduser', bdd.findArchiveByidUser);
app.post('/archive', bdd.addArchive);

// utilisation de l'api twitter
app.get('/list/:nomTwitter', twitter.lasttweet);



app.listen(3000);
console.log('Listening on port 3000...');