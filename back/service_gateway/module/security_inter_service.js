

var jwt    = require('jsonwebtoken');

var restclient = require('node-rest-client').Client;
var gestion 	= require('./gestion_gateway');

// Ce log sur le service
// envoi les identifiants
// retourne un token
exports.contacterServiceForToken = function(host, res) {
	var client = new restclient();

	var datas = JSON.stringify({
      login: gestion.recuperationInfos().login,
      mdp: gestion.recuperationInfos().mdp
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

