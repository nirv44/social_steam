var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'social_steam_db'
});
 
connection.connect();
 

// Exemple d'un user en bdd
//var user = {
//  id: Number,
//  email: String,
//  password: String,
//  nomTwitter: String,
//	nomFacebook: String,
//	nomSteam: String
//};


// Vérifie si un user existe par so nemail et mdp
// entré : email: String / password: String
// Sortie : un User
exports.findByEmailPassUser = function(req, res) {
	connection.query('SELECT * FROM user WHERE email = ? and password = ?', [req.query.email, req.query.password], function(err, results) {
	if (err) throw err;
		res.json(results[0]);
	});
}

// ajoute un User
// entré : Un User
// sortie : /
exports.addUser = function(req, res) {
	connection.query('INSERT INTO user SET ?', req.body, function(err, result) {
	  if (err) throw err;
	});
}
