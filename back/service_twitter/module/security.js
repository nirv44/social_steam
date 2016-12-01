
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
exports.verifytoken = function(req) {
	var token = req.headers['token'];

	if(token) {
		var decode = jwt.verify(token, secretGateway);
		if(decode.login == login && decode.mdp == modp){
			return true;
		}
	}
	return false;
}