
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
		security.contacterServiceForToken(hostUser, function(token){
			if(token != null){
				var client = new restclient();

				var datas = JSON.stringify({
			      email: decode.email,
			      password: decode.password
			    });
			    var arg = {
			    	headers:
			    		{ 
			    			"Content-Type": "application/json",
			    			"data": datas,
			    			"token": donns[2]
			    	 	}
			    }
													
				client.get(donns[0] +"/user", arg, function(data, respo) {
					if(data != null){
						if(data.email == decode.email && data.password == decode.password){
							return req;
						}else{
							return false;
						}
					}else{
						return false;
					}
				}).on('error', function(error) {
					gestion.gestionErreur(error);
					return false;
				});

			}
		});
	}
	
	return false;
}