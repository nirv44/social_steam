var mysql      = require('mysql');

var	secure = require('./security');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'social_steam_db'
});
 
connection.connect(function(err) {
  console.log("Il faut penser a démarer et créer la base de donnée");
  console.log("________");
  console.log("table : user");
  console.log("id: int,  email: String,  password: String, steam_api_key: String, steam_id: String, iduser: int, consumer_key: String,consumer_secret: String, access_token_key: String, access_token_secret: String")
});
 

// ________________________ //
// Exemple d'un user en bdd //
// ________________________ //

//  id: Number,
//  email: String,
//  password: String
//  steam_api_key: String,
//	steam_id: String
//  iduser: Number,
//  consumer_key: String,
//	consumer_secret: String,
//	access_token_key: String,
//	access_token_secret: String



// Vérifie si un user existe par son email et mdp
// entré : email: String / password: String
// Sortie : un User
exports.findByEmailPassUser = function(req, res) {
	var recup = secure.verifytoken(req);
	if(recup != false){
		connection.query('SELECT * FROM user WHERE email = ? and password = ?', [JSON.parse(req.headers.data).email, JSON.parse(req.headers.data).password], function(err, results) {
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
	if(recup != false){
		connection.query('SELECT * FROM user', function(err, results){
			if(err) throw err;
			res.json(results);
		});
	}
}


// ajoute un User
// entré : Un User
// sortie : /
exports.addUser = function(req, res) {	
	var recup = secure.verifytoken(req);
	if(recup != false){
		connection.query('INSERT INTO user SET ?', JSON.parse(req.headers.data), function(err, result) {
			if (err) throw err;
			res.json({success: true});
		});
	}
}


// update un User
// entré : Un User
// sortie : /
exports.updateUser = function(req, res) {
	var recup = secure.verifytoken(req);
		if(recup != false){
		connection.query('UPDATE user SET ? WHERE id = ?', [JSON.parse(req.headers.data),req.params.iduser], function(err, result) {
		  if (err) throw err;
		  res.json(result);
		});
	}
}