

var restclient = require('node-rest-client').Client;

var security = require('./security_inter_service');

var hostUser = "http://127.0.0.1:3001";
var hostTwitter = "http://127.0.0.1:3002";
var hostSteam = "http://127.0.0.1:3003";


var secretGateway 	= "fds5fds54fds56fds6seee2e2";




// Vérifie si un user existe par son email et mdp
// entré : email: String / password: String
// Sortie : un token
exports.Connexion = function(req, res) {
	// TOKEN du 'service User'
	security.contacterServiceForToken(hostUser, function(token){
		if(token != null){

			if(req.body != null){
				if(req.body.email != null && req.body.password != null){
					var reqs = "";
					// La on check si le user correspond
					reqs[0] = hostUser;
					reqs[1] = req.body;
					reqs[2] = token;

					var retour = SuiteConnexionVerserviceUseravecParam(reqs);
					if(retour != null){

						// sil correpond on renvoi le token perso a l'utilisateur
						if(retour.email == req.body.email && retour.mdp == req.body.password){
							var token = jwt.sign(req.body, secretGateway, {
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


				}
			}
			
		}
	});

	var recupe = JSON.parse(req.headers.data);
}




// Appel le service user
// entré : url:port / les identifiants / token
// Sortie : user
SuiteConnexionVerserviceUseravecParam = function(donns){
	// petit Check des données
	if(donns != null){
		if(donns[0] != null){
			if(donns[1] != null){
				if(donns[1].email =! null && donns[1].password != null){
					if(donns[2] != null){

						var client = new restclient();

						var datas = JSON.stringify({
					      email: donns[1].email,
					      mdp: donns[1].password
					    });

					    var arg = {
					    	headers: 
					    		{ 
					    			"Content-Type": "application/json",
					    			"data": datas,
					    			"token": donns[2]
					    	 	}
					    }

						client.get(donns[0] +"/user", arg, function(data, response) {
							if(data != null){
								res(data);
							}else{
								res(null);
							}
							
						}).on('error', function(error) {
							if(error.code === "ECONNREFUSED"){
								res(null);
								console.log("Service "+ donns[0] +" down");
							}else{
								res(null);
								console.log("Erreur avec le service")
							}
						});


					}
				}
			}
		}
	}
	res(null);
}













// ajoute un User
// entré : Un User
// sortie : /
exports.Inscription = function(req, res) {
	
	// add service user
	security.contacterServiceForToken(hostUser, function(token){
		var client = new restclient();
		var datas = JSON.stringify({
			"email":req.body.email,
			"password": req.body.password
		});
	    var arg = {
	    	headers: 
	    		{ 
	    			"Content-Type": "application/json",
	    			"data": datas,
	    			"token": token
	    	 	}
	    }
		client.post(hostUser+"/user", arg, function(data, response) {

		});			
	});

}



exports.modifierCompte = function(req, res) {

	// service user
	security.contacterServiceForToken(hostUser, function(token){
		var client = new restclient();
		var datas = JSON.stringify({
			"email":req.body.email,
			"password": req.body.password
		});
	    var arg = {
	    	headers: 
	    		{ 
	    			"Content-Type": "application/json",
	    			"data": datas,
	    			"token": token
	    	 	}
	    }
		client.post(hostUser+"/user", arg, function(data, response) {

		});			
	});

	// service steam
	security.contacterServiceForToken(hostSteam, function(token){
		var client = new restclient();

		var datas = JSON.stringify({
			"iduser":req.body.iduser,
			"steam_api_key": req.body.steam_api_key,
			"steam_id": req.body.steam_id
		});

	    var arg = {
	    	headers: 
	    		{ 
	    			"Content-Type": "application/json",
	    			"data": datas,
	    			"token": token
	    	 	}
	    }
		client.post(hostSteam+"/steam", arg, function(data, response) {

		});
	});

}




// cette boucle permet d'envoi les notifications a twitter et fb
// pour cela elle va check pour tous les users s'il ne son pas en train de jouer

var lesUsers = null;

while(true){

	// je vais chercher tous les users
	security.contacterServiceForToken(hostUser, function(token){
		var client = new restclient();

	    var arg = {
	    	headers: 
	    		{ 
	    			"Content-Type": "application/json",
	    			"token": token
	    	 	}
	    }
		client.get(hostUser+"/users", arg, function(data, response) {
			lesUsers = data;
		});
	});


	security.contacterServiceForToken(hostSteam, function(token){
		// pour tous les users en bdd
		if(lesUsers != null){
			for (var i = 0; i < lesUsers; i++) {
					
				var client = new restclient();

			    var arg = {
			    	headers: 
			    		{ 
			    			"Content-Type": "application/json",
			    			"token": token
			    	 	}
			    }
			    // je regarde les infos du user
				client.get(hostSteam+"/steam/"+lesUsers[i].iduser, arg, function(data, response) {
					if(data != null){
						// si en réponse j'ai bien un gameid alors jenvoi l'info a tweet/fb

						// DUUUUUU COOOOOODE A FAIRE ICI !!!!!!!!!!!!!!!
						// DUUUUUU COOOOOODE A FAIRE ICI !!!!!!!!!!!!!!!
						// DUUUUUU COOOOOODE A FAIRE ICI !!!!!!!!!!!!!!!
						// DUUUUUU COOOOOODE A FAIRE ICI !!!!!!!!!!!!!!!
						// DUUUUUU COOOOOODE A FAIRE ICI !!!!!!!!!!!!!!!
						// DUUUUUU COOOOOODE A FAIRE ICI !!!!!!!!!!!!!!!
						// DUUUUUU COOOOOODE A FAIRE ICI !!!!!!!!!!!!!!!
						// DUUUUUU COOOOOODE A FAIRE ICI !!!!!!!!!!!!!!!
						// DUUUUUU COOOOOODE A FAIRE ICI !!!!!!!!!!!!!!!

					}
				});
			}
		}
	});

	
	



}