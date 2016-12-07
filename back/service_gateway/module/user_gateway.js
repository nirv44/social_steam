

var restclient = require('node-rest-client').Client;

var security = require('./security_inter_service');

var hostUser = "http://127.0.0.1:3001";
var hostTwitter = "http://127.0.0.1:3002";
var hostSteam = "http://127.0.0.1:3003";


var jwt 			= require('jsonwebtoken');
var secretGateway 	= "fds5fds54fds56fds6seee2e2";


var gestion = require("./gestion_gateway");


// Vérifie si un user existe par son email et mdp
// entré : email: String / password: String
// Sortie : un token
exports.Connexion = function(req, res) {
	// TOKEN du 'service User'
	security.contacterServiceForToken(hostUser, function(token){
		if(token != null){
			if(req.body != null){
				if(req.body.email != null && req.body.password != null){
					var donns = [];
					// La on check si le user correspond
					donns[0] = hostUser;
					donns[1] = JSON.stringify(req.body);
					donns[2] = token;
			
					// petit Check des données
					if(donns != null){
						if(donns[0] != null){
							if(donns[1] != null){
								if(JSON.parse(donns[1]).email =! null && JSON.parse(donns[1]).password != null){
									if(donns[2] != null){


										var client = new restclient();
										var datas = JSON.stringify({
									      email: JSON.parse(donns[1]).email,
									      password: JSON.parse(donns[1]).password
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
												// sil correpond on renvoi le token perso a l'utilisateur
												if(data.email == req.body.email && data.password == req.body.password){
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
											}else{
												res.json({success: false});
											}
										}).on('error', function(error) {
											if(error.code === "ECONNREFUSED"){
												console.log("Service "+ donns[0] +" down");
												res.json({success: false});
											}else{
												console.log("Erreur avec le service");
												res.json({success: false});
											}
										});


									}
								}
							}
						}
					}


				}
			}
			
		}
	});

}


/*

// Appel le service user
// entré : url:port / les identifiants / token
// Sortie : user
var SuiteConnexionVerserviceUseravecParam = function(donns, res){
	// petit Check des données
	if(donns != null){
		if(donns[0] != null){
			if(donns[1] != null){
				if(JSON.parse(donns[1]).email =! null && JSON.parse(donns[1]).password != null){
					if(donns[2] != null){


						var client = new restclient();
						var datas = JSON.stringify({
					      email: JSON.parse(donns[1]).email,
					      password: JSON.parse(donns[1]).password
					    });


					    var arg = {
					    	headers:
					    		{ 
					    			"Content-Type": "application/json",
					    			"data": datas,
					    			"token": donns[2]
					    	 	}
					    }


						client.get(donns[0] +"/user", arg, function(data, res) {
							if(data != null){
								res(data);
							}else{
								res(null);
							}
						}).on('error', function(error) {
							if(error.code === "ECONNREFUSED"){
								console.log("Service "+ donns[0] +" down");
								res(null);
							}else{
								console.log("Erreur avec le service");
								res(null);
							}
						});


					}
				}
			}
		}
	}
}*/




// User
//  email: String,
//  password: String
//  steam_api_key: String,
//	steam_id: String
//  consumer_key: String,
//	consumer_secret: String,
//	access_token_key: String,
//	access_token_secret: String

// ajoute un User
// entré : Un User
// sortie : /
exports.Inscription = function(req, res) {
	// add service user
	security.contacterServiceForToken(hostUser, function(token){
		if (token != null){
			var client = new restclient();
			var datas = JSON.stringify({
				"email": req.body.email,
				"password": req.body.password,
				"steam_api_key": req.body.steam_api_key,
				"steam_id": req.body.steam_id,
				"consumer_key": req.body.consumer_key,
				"consumer_secret": req.body.consumer_secret,
				"access_token_key": req.body.access_token_key,
				"access_token_secret": req.body.access_token_secret
			});
		    var arg = {
		    	headers: 
		    		{ 
		    			"Content-Type": "application/json",
		    			"data": datas,
		    			"token": token
		    	 	}
		    }
			client.post(hostUser+"/user", arg, function(datare, response) {
				// penser a false si pas ok
				res.json({
					success: true
				});
			});	
		}else{
			
		}
	});
}




// User
//  email: String,
//  password: String

//  Steam
//  iduser: Number,
//  steam_api_key: String,
//	steam_id: String

//  Twitter
//  iduser: Number,
//  consumer_key: String,
//	consumer_secret: String,
//	access_token_key: String,
//	access_token_secret: String

exports.modifierCompte = function(req, res) {

	// service user
	security.contacterServiceForToken(hostUser, function(token){
		if (token != null){
			var client = new restclient();
			var datas = JSON.stringify({
				"email": req.body.email,
				"password": req.body.password,
				"steam_api_key": req.body.steam_api_key,
				"steam_id": req.body.steam_id,
				"consumer_key": req.body.consumer_key,
				"consumer_secret": req.body.consumer_secret,
				"access_token_key": req.body.access_token_key,
				"access_token_secret": req.body.access_token_secret
			});
		    var arg = {
		    	headers: 
		    		{ 
		    			"Content-Type": "application/json",
		    			"data": datas,
		    			"token": token
		    	 	}
		    }
			client.put(hostUser+"/user/"+req.params.iduser, arg, function(data, response) {
				res.json({
					success: true
				});
			});		
		}	
	});



}




// cette boucle permet d'envoi les notifications a twitter et f

var lesUsers = null;

exports.checkifplaying = function(req, res){

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
				client.get(hostSteam+"/steam/"+req.params.iduser, arg, function(data, response) {
					if(data != null){
						// si en réponse j'ai bien un gameid alors jenvoi l'info a tweet/fb

						if(data.gameid != null || data.gameid > 0){
							// DUUUUUU COOOOOODE A FAIRE ICI !!!!!!!!!!!!!!!
							// DUUUUUU COOOOOODE A FAIRE ICI !!!!!!!!!!!!!!!
							// DUUUUUU COOOOOODE A FAIRE ICI !!!!!!!!!!!!!!!



						}

					}
				});
			}
		}
	});

}

