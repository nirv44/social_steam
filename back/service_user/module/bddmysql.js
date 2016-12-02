var mysql      = require('mysql');

var	secure = require('./security');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'social_steam_db'
});
 
connection.connect();
 

// ________________________ //
// Exemple d'un user en bdd //
// ________________________ //
//var user = {
//  id: Number,
//  email: String,
//  password: String
//};


// Vérifie si un user existe par son email et mdp
// entré : email: String / password: String
// Sortie : un User
exports.findByEmailPassUser = function(req, res) {
	var recup = secure.verifytoken(req);
	if(recup != null){
		connection.query('SELECT * FROM user WHERE email = ? and password = ?', [req.body.email, req.body.password], function(err, results) {
		if (err) throw err;
			res.json(results[0]);
		});
	}	
}

// Ramene tous les user présents en bdd
// entré : token
// Sortie : les users
exports.findallUser = function(req, res) {
	var recup = secure.verifytoken(req);
	if(recup != null){
		connection.query('SELECT * FROM user', function(err, results){
			if(err) throw err;
			res.json(results);
		}
	}
}

// ajoute un User
// entré : Un User
// sortie : /
exports.addUser = function(req, res) {
	var recup = secure.verifytoken(req);
		if(recup != null){
		connection.query('INSERT INTO user SET ?', req.body, function(err, result) {
		  if (err) throw err;
		  res.json(result[0]);
		});
	}
}

// update un User
// entré : Un User
// sortie : /
exports.updateUser = function(req, res) {
	var recup = secure.verifytoken(req);
		if(recup != null){
		connection.query('UPDATE user SET ? WHERE id = ?', [req.body,req.params.id], function(err, result) {
		  if (err) throw err;
		  res.json(result);
		});
	}
}






