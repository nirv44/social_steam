var mysql      = require('mysql');

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
//  password: String,
//  nomTwitter: String,
//	nomFacebook: String,
//	nomSteam: String
//};


// Vérifie si un user existe par son email et mdp
// entré : email: String / password: String
// Sortie : un User
exports.findByEmailPassUser = function(req, res) {
	var recup = verifytoken(req);
	if(recup != null){
		connection.query('SELECT * FROM user WHERE email = ? and password = ?', [req.body.email, req.body.password], function(err, results) {
		if (err) throw err;
			res.json(results[0]);
		});
	}	
}

// ajoute un User
// entré : Un User
// sortie : /
exports.addUser = function(req, res) {
	var recup = verifytoken(req);
		if(recup != null){
		connection.query('INSERT INTO user SET ?', req.body, function(err, result) {
		  if (err) throw err;
		});
	}
}

// update un User
// entré : Un User
// sortie : /
exports.updateUser = function(req, res) {
	var recup = verifytoken(req);
		if(recup != null){
		connection.query('UPDATE user SET ? WHERE id = ?', [req.body,req.params.id], function(err, result) {
		  if (err) throw err;
		});
	}
}

// update un User
// entré : Un User
// sortie : /
exports.delteUser = function(req, res) {
	var recup = verifytoken(req);
		if(recup != null){
		connection.query('DELETE FROM user WHERE id = ?', req.body.id, function(err, result) {
		  if (err) throw err;
		});
	}
}





//___________________________________________________
//___________________________________________________
//__________Securité vers le service gateway_________
//___________________________________________________
//___________________________________________________


var jwt 			= require('jsonwebtoken');

var secretGateway 	= "monsecretdelagatexay0123875";
var login 			= "nico";
var modp 			= "jemapellecommentstjames";

/// IMPORTANT ///
// le token s'insere dans le header


// Vérifie si les identifiant concorde
// Si oui alors on renvoi un token
// Entré : Identifiant
// Sortie : Token liée
exports.securityToken = function(req, res) {
	var recupe = JSON.parse(req.headers.data);

	if(recupe.login == login && recupe.mdp == modp){
		var token = jwt.sign(recupe, secretGateway, {
			expiresIn: 86400 // expires in 24 hours
		});
		
		res.json({
			success: true,
			token: token
		});
	}else{
		res.json({success: false});
	}
	
}

// Permet de savoir si le token recut est bon
// Entré : token
// Sortie : boolean (true si ok)
verifytoken = function(req) {
	var token = req.headers['token'];

	if(token) {
		var decode = jwt.verify(token, secretGateway);
		if(decode.login == login && decode.mdp == modp){
			return req;
		}
	}
	return false;
}