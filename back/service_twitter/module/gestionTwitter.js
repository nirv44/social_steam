/**
 * @swagger
 * resourcePath: /service_twitter
 * description: service Twitter
 */

var Twitter = require('twitter');

var bdd = require('./bddmysql');
var secure = require('./security');



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





/**
 * @swagger
 * path: /sendtweet
 * operations:
 *   -  httpMethod: POST
 *      summary: Envoi un twee
 *      notes: Envoi un tweet sur le compte concerné
 *      nickname: tweet
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: email
 *          description: Votre mail
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Votre mot de passe
 *          paramType: query
 *          required: true
 *          dataType: string
 */
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


