var fb = require('fb');

FB.setAccessToken('access_token');
 

var bdd = require("./bddmysql");


var token = function(req, res){

	var letout = bdd.cherchetoken(req)
	if(letout != null){
		fb.api('oauth/access_token', {
		    client_id: letout.client_id,
		    client_secret: letout.client_secret,
		    grant_type: 'fb_exchange_token'
		}, function (res) {
		    if(!res || res.error) {
		        console.log(!res ? 'error occurred' : res.error);
		        res(false);
		    }
		 	res(true);
		    var accessToken = res.access_token;
		    var expires = res.expires ? res.expires : 0;
		});
	}
	
}


exports.sendMessage = function(req, res){
	
	token(req.body.iduser, function(result){
		if(result == true){

			fb.api('me/feed', 'post', { message: req.body.message }, function (res) {
			  if(!res || res.error) {
			    console.log(!res ? 'error occurred' : res.error);
			    return;
			  }
			  console.log('Post Id: ' + res.id);
			});	

		}
	});
}

