
//___________________________________________________
//___________________________________________________
//__________Securité JWT vers l'utilisateur__________
//___________________________________________________
//___________________________________________________


var jwt 			= require('jsonwebtoken');

var secretGateway 	= "fds5fds54fds56fds6seee2e2";


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