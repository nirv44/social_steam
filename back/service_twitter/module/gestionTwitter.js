var Twitter = require('twitter');

var bdd = require('./module/bddmysql');
var secure = require('./module/security');






// Prepare le compte twitter sur lequel va être poster les tweets
prepareClientTwitter = function(iduser){
	
	var client = null;
	var letout = bdd.cherchetoken(iduser);

	if (letout != null) {
		client = new Twitter({
			consumer_key: letout.consumer_key,
			consumer_secret: letout.consumer_secret,
			access_token_key: letout.access_token_key,
			access_token_secret: letout.access_token_secret
		});
	}

	return client;
}





// Poste un tweet
// Entré : le tweet a poster
exports.sendPLayingInTwiter = function (req, res) {
	var recupe = secure.verifytoken(req);
	if(recupe != null){


		var client = prepareClientTwitter(req.body.iduser);
		if(client != null){
			client.post('statuses/update', {status: req.body.tweet}, function(error, tweet, response){
				if(error){
					res.json({success: false});
				}
				res.json({success: true});
			});
		}else{
			res.json({success: false});
		}

	}

}


