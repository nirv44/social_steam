
var jwt    = require('jsonwebtoken');

var restclient = require('node-rest-client').Client;


var secretGateway = "mysecretdebond007";



// Vérifie si un user existe par son email et mdp
// entré : email: String / password: String
// Sortie : un token
exports.Connexion = function(req, res) {
	// TOKEN du service User
	contacterServiceUserWithToken(function(token){
		if(token != null){
		
		}
	});

	// Si ok
	//token
	/*var token = jwt.sign(user, secretGateway, {
		expiresIn: 86400 // expires in 24 hours
	});

	res.json({
		success: true,
		token: token
	});
	*/
}

// ajoute un User
// entré : Un User
// sortie : /
exports.Inscription = function(req, res) {
	
}








//___________________________________________________
//__________Securité vers le service User____________
//___________________________________________________





var hostUser = "http://127.0.0.1:3001";



exports.test = function(req, res){
	var token = contacterServiceUserWithToken(function(token){
		console.log(token);
		var client = new restclient();
		var arg = {
	    	headers: 
	    		{ 
	    			"Content-Type": "application/json",
	    			"token": token
	    	 	}
	    }

		client.get(hostUser+"/user", arg, function(data, response) {
			
			
		});

	});
}





// Ce log sur le service User
// envoi les identifiants
// retourne un token
contacterServiceUserWithToken = function(res) {
	var client = new restclient();

	var datas = JSON.stringify({
      login: "nico",
      mdp: "jemapellecommentstjames"
    });

    var arg = {
    	headers: 
    		{ 
    			"Content-Type": "application/json",
    			"data": datas
    	 	}
    }

	client.get(hostUser+"/logs", arg, function(data, response) {
		res(data.token);
	});
}












