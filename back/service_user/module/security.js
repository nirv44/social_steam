/**
 * @swagger
 * resourcePath: /securtity
 * description: service utilsateur
 */
var jwt 			= require('jsonwebtoken');

var secretGateway 	= "monsecretdelagatexay0123875";
var login 			= "nico";
var modp 			= "jemapellecommentstjames";





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
	var recupe = JSON.parse(req.headers.data);

	if(recupe.login == login && recupe.mdp == modp){
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
	
}


exports.verifytoken = function(req) {
	var token = req.headers['token'];
	if(token) {
		var decode = jwt.verify(token, secretGateway);
		if(decode.login == login && decode.mdp == modp){
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