/**
 * @swagger
 * resourcePath: /security
 * description: service utilsateur
 */
"use strict";
//___________________________________________________
//___________________________________________________
//__________Securité vers le service gateway_________
//___________________________________________________
//___________________________________________________


var jwt 			= require('jsonwebtoken');
var gestion 		= require('./infos_steam');



var secretGateway 	= gestion.recuperationInfos().secretGateway;
var login 			= gestion.recuperationInfos().login;
var mdp 			= gestion.recuperationInfos().mdp;




// Vérifie si les identifiant concorde
// Si oui alors on renvoi un token
// Entré : Identifiant
// Sortie : Token liée
/**
 * @swagger
 * path: /logs
 * operations:
 *   -  httpMethod: GET
 *      summary: generer token
 *      notes: Retourne un token 
 *      responseClass: token
 *      nickname: token
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: login
 *          description: Votre login (headers.data)
 *          paramType: headers
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Votre mot de passe (headers.data)
 *          paramType: headers
 *          required: true
 *          dataType: string
 */
exports.securityToken = function(req, res) {
	var recupe = "";

	try{
		recupe = JSON.parse(req.headers.data);
		if(recupe.login == login && recupe.mdp == mdp){
			var token = jwt.sign(recupe, secretGateway, {
				expiresIn: 86400 // expires in 24 hours
			});
			res.json({
				success: true,
				token: token
			});
		}else{
			res.json({success: false});
		}
	}catch(e){
		console.log("Token non valide");
		res.json({success: false});
	}
	
}

// Permet de savoir si le token recut est bon
// Entré : token
// Sortie : boolean (true si ok)
exports.verifytoken = function(req) {
	var token = req.headers['token'];

	if(token) {
		var decode = jwt.verify(token, secretGateway);
		if(decode.login == login && decode.mdp == mdp){
			return true;
		}
	}
	return false;
}

/**
 * @swagger
 * models:
 *   token:
 *     id: token
 *     properties:
 *       token:
 *         type: String
 */