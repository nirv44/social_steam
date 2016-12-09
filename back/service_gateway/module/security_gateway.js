
//___________________________________________________
//___________________________________________________
//__________Securité JWT vers l'utilisateur__________
//___________________________________________________
//___________________________________________________


var jwt 			= require('jsonwebtoken');
var gestion 		= require('./gestion_gateway');

var secretGateway 	= gestion.recuperationInfos().secretGateway;


// Permet de savoir si le token recut est bon
// Entré : token
// Sortie : boolean (true si ok)
exports.verifytoken = function(req) {
	var token = req.headers['token'];

	if(token) {
		var decode = jwt.verify(token, secretGateway);
		if(decode.login == login && decode.mdp == modp){
			return req;
		}
	}
	
	return false;
}