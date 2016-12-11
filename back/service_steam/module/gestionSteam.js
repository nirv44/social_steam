/**
 * @swagger
 * resourcePath: /
 * description: service Steam
 */
"use strict";
var steam = require('steam-web');


var bdd = require('./bddmysql');
var secure = require('./security');


// Prepare les infos du compte Steam
var prepareClientSteam = function(iduser){
	
	var saller = null;
	var letout = bdd.chercheKeyAndId(iduser);

	if (letout != null) {
		saller[0] = new steam({
		  apiKey: letout.steam_api_key,
		  format: 'json'
		});
		saller[1] = letout.steam_id;
	}

	return saller;
}

/**
 * @swagger
 * path: /steam/{iduser}
 * operations:
 *   -  httpMethod: GET
 *      summary: Récupération des informations Steam de l'utilisateur
 *      notes: Retourne les informations steam de l'utilisateur
 *      responseClass: Profile
 *      nickname: SteamProfile
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: iduser
 *          description: Identifiant de l'utilisateur (headers.data)
 *          paramType: headers
 *          required: true
 *          dataType: int
 *        - name: steamids
 *          description: Identifiant de l'utilisateur (headers.data)
 *          paramType: headers
 *          required: true
 *          dataType: string
 *        - name: format
 *          description: Identifiant de l'utilisateur (headers.data)
 *          paramType: headers
 *          required: true
 *          dataType: string
 */
exports.getInformationSteamByUser = function(req, res) {
	var recupe = secure.verifytoken(req);
	if(recupe != false){

		var sretour = prepareClientSteam(req.params.iduser);
		


		if(s != null){
			if (steamids != null) {
				var s = sretour[0];
				var steamids = sretour[1];
				
				s.getPlayerSummaries({
					steamids: [steamids],
					callback: function(err, data) {
						res.json({
							success: true,
							data: data
						});
					}
				});

			}
		}else{
			res.json({success: false});
		}
	}else{
		res.json({success: false});
	}
}

/**
 * @swagger
 * models:
 *   Profile:
 *     id: Profile
 *     properties:
 *       steamid:
 *         type: String
 *       personaname:
 *         type: String
 *       profileurl:
 *         type: String    
 *       avatar:
 *         type: String
 *       avatarmedium:
 *         type: String
 *       avatarfull:
 *         type: String
 *       personastate:
 *         type: String
 *       communityvisibilitystate:
 *         type: String
 *       profilestate:
 *         type: String
 *       lastlogoff:
 *         type: String
 *       commentpermission:
 *         type: String
 *       realname:
 *         type: String
 *       primaryclanid:
 *         type: String
 *       timecreated:
 *         type: String
 *       gameid:
 *         type: String
 *       gameserverip:
 *         type: String
 *       gameextrainfo:
 *         type: String
 *       cityid:
 *         type: String
 *       loccountrycode:
 *         type: String
 *       locstatecode:
 *         type: String
 *       loccityid:
 *         type: String
 */