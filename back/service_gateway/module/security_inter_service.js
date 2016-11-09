

var jwt    = require('jsonwebtoken');

var restclient = require('node-rest-client').Client;


//___________________________________________________
//_____________Securité vers les service ____________
//___________________________________________________




/*
exports.test = function(req, res){
	var host = "http://127.0.0.1:3001";
	var token = contacterServiceForToken(host, function(token){
		console.log(token);
		var client = new restclient();
		var arg = {
	    	headers: 
	    		{ 
	    			"Content-Type": "application/json",
	    			"token": token
	    	 	}
	    }

		client.get(host+"/user", arg, function(data, response) {
			
			
		}).on('error', function(error) {
			if(error.code === "ECONNREFUSED"){
				console.log("Service "+ host+" down");
			}else{
				console.log("Erreur avec le service")
			}
		});

	});
}
*/


// Ce log sur le service
// envoi les identifiants
// retourne un token
contacterServiceForToken = function(host, res) {
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

	
	client.get(host +"/logs", arg, function(data, response) {
		res(data.token);
	}).on('error', function(error) {
		if(error.code === "ECONNREFUSED"){
			res(null);
			console.log("Service "+ host+" down");
		}else{
			res(null);
			console.log("Erreur avec le service")
		}
	});

	res(null);

}

