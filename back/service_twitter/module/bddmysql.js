var mysql      = require('mysql');

var	secure = require('./security');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'social_steam_db'
});
 
connection.connect();
 

// __________________________________ //
// Exemple d'un twitterGestion en bdd //
// __________________________________ //
//var twitterGestion = {
//  id: Number,
//  iduser: Number,
//  consumer_key: String,
//	consumer_secret: String,
//	access_token_key: String,
//	access_token_secret: String
//};



// ajoute les token et consumer key liée a twitter
// entré : un twitterGestion
// sortie : /
exports.addtwitter = function(req, res) {
	var recup = secure.verifytoken(req);
	if(recup != null){
		connection.query('INSERT INTO twittergestion SET ?', req.body, function(err, result) {
	  		if (err) throw err;
	  		res.json(result);
		});
	}
}


exports.cherchetoken = function(iduser){
	connection.query('SELECT * FROM twittergestion WHERE iduser = ?', iduser, function(err, results) {
		if (err){
			return null;
		}
		return JSON.stringify(results[0]);
	});
}