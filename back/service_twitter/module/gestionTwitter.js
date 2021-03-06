/**
 * @swagger
 * resourcePath: /
 * description: service Twitter
 */
"use strict";
var Twitter = require('twitter');

var bdd = require('./bddmysql');
var secure = require('./security');



var prepareClientTwitter = function(iduser){
	
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
 *      summary: Envoi un tweet
 *      notes: Envoi un tweet sur le compte concerné
 *      nickname: tweet
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: iduser
 *          description: Identifiant de l'utilisateur
 *          paramType: query
 *          required: true
 *          dataType: string
 */
exports.sendPLayingInTwiter = function (req, res) {
	var recupe = secure.verifytoken(req);
	if(recupe != false){
		var client = prepareClientTwitter(req.body.iduser);
		if(client != null){
			client.post('statuses/update', {status: req.body.tweet}, function(error, tweet, response){
				if(error){
					res.json({success: false});
				}
				res.json({success: true});
			}).on('error', function(error) {
				gestion.gestionErreur(error);
				res.json({success : false});
			});	
		}else{
			res.json({success: false});
		}

	}else{
		res.json({success: false});
	}

}


