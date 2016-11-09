var mysql      = require('mysql');

var	secure = require('./module/security');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'social_steam_db'
});
 
connection.connect();
 

// ________________________________ //
// Exemple d'un steamGestion en bdd //
// ________________________________ //
//var steamGestion = {
//  id: Number,
//  iduser: Number,
//  steam_api_key: String,
//	steam_id: String
//};





// ajoute l'api key et le steam id liée à Steam
// entré : un twitterGestion
// sortie : /
exports.addsteam = function(req, res) {
	var recup = secure.verifytoken(req);
	if(recup != null){
		connection.query('INSERT INTO steamgestion SET ?', req.body, function(err, result) {
	  		if (err) throw err;
		});
	}
}


exports.chercheKeyAndId = function(iduser){
	connection.query('SELECT * FROM steamgestion WHERE iduser = ?', iduser, function(err, results) {
		if (err){
			return null;
		}
		return JSON.stringify(results[0]);
	});
}