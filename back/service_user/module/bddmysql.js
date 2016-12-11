/**
 * @swagger
 * resourcePath: /
 * description: service utilsateur
 */
"use strict";
var mysql = require('mysql');

var	secure = require('./security');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'social_steam_db'
});

connection.connect(function(err) {
	if(err){
		console.log("Il faut penser a démarer et créer la base de donnée");
		console.log("bdd : social_steam_db");
		console.log("table : user");
		console.log("id: int,  email: String,  password: String, steam_api_key: String, steam_id: String, consumer_key: String,consumer_secret: String, access_token_key: String, access_token_secret: String");
	}
 });



/**
 * @swagger
 * path: /user
 * operations:
 *   -  httpMethod: GET
 *      summary: Connexion avec un mail et mot de passe
 *      notes: Retourne un utilisateur liée a l'email / mot de passe
 *      responseClass: User
 *      nickname: login
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: email
 *          description: Votre mail (headers.data)
 *          paramType: headers
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Votre mot de passe (headers.data)
 *          paramType: headers
 *          required: true
 *          dataType: string
 *        - name: token
 *          description: le token qui doit etre generer par /logs (headers.token)
 *          paramType: headers
 *          required: true
 *          dataType: string
 */
exports.findByEmailPassUser = function(req, res) {
	var recup = secure.verifytoken(req);
	if(recup != false){
		try{
			if(JSON.parse(req.headers.data).email != null || JSON.parse(req.headers.data).email != ""){
				if(JSON.parse(req.headers.data).password != null || JSON.parse(req.headers.data).password != ""){

					connection.query('SELECT * FROM user WHERE email = ? and password = ?', [JSON.parse(req.headers.data).email, JSON.parse(req.headers.data).password], function(err, results) {
						if (err) throw err;
						res.json(results[0]);
					});

				}else{
					res.json({success: false});
				}
			}else{
				res.json({success: false});
			}
		}catch(e){
			res.json({success: false});
		}
	}else{
		res.json({success: false});
	}
}





/**
 * @swagger
 * path: /user
 * operations:
 *   -  httpMethod: POST
 *      summary: Ajouter un utilsateur
 *      notes: Retourne true (si ok) ou false (si pas ok)
 *      responseClass: User
 *      nickname: Ajouter
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: email
 *          description: Votre mail (headers.data)
 *          paramType: headers
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Votre mot de passe (headers.data)
 *          paramType: headers
 *          required: true
 *          dataType: string
 *        - name: steam_api_key
 *          description: Votre clé steam (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: steam_id
 *          description: Votre ID Steam (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: consumer_key
 *          description: Votre clé twitter (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: consumer_secret
 *          description: Votre clé secrete twitter (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: access_token_key
 *          description: Votre token twitter (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: access_token_secret
 *          description: Votre token secret twitter (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: token
 *          description: le token qui doit etre generer par /logs (headers.token)
 *          paramType: headers
 *          required: true
 *          dataType: string
 */
exports.addUser = function(req, res) {	
	var recup = secure.verifytoken(req);
	if(recup != false){
		try{
			if(JSON.parse(req.headers.data).email != null || JSON.parse(req.headers.data).email != ""){
				if(JSON.parse(req.headers.data).password != null || JSON.parse(req.headers.data).password != ""){

					connection.query('INSERT INTO user SET ?', JSON.parse(req.headers.data), function(err, result) {
						if (err) throw err;
						res.json({success: true});
					});
					
				}else{
					res.json({success: false});
				}
			}else{
				res.json({success: false});
			}
		}catch(e){
			res.json({success: false});
		}
	}else{
		res.json({success: false});
	}
}



/**
 * @swagger
 * path: /user/{iduser}
 * operations:
 *   -  httpMethod: PUT
 *      summary: Modifie un utilsateur
 *      notes: Retourne l'utilisateur modifier
 *      responseClass: User
 *      nickname: Modifier
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: iduser
 *          description: Votre id utilisateur (params)
 *          paramType: params
 *          required: true
 *          dataType: int
 *        - name: email
 *          description: Votre mail (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: password
 *          description: Votre mot de passe (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: steam_api_key
 *          description: Votre clé steam (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: steam_id
 *          description: Votre ID Steam (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: consumer_key
 *          description: Votre clé twitter (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: consumer_secret
 *          description: Votre clé secrete twitter (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: access_token_key
 *          description: Votre token twitter (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: access_token_secret
 *          description: Votre token secret twitter (headers.data)
 *          paramType: headers
 *          required: false
 *          dataType: string
 *        - name: token
 *          description: le token qui doit etre generer par /logs (headers.token)
 *          paramType: headers
 *          required: true
 *          dataType: string
 */
exports.updateUser = function(req, res) {
	var recup = secure.verifytoken(req);
		if(recup != false){
		connection.query('UPDATE user SET ? WHERE id = ?', [JSON.parse(req.headers.data),req.params.id], function(err, result) {
		  if (err) throw err;
		  res.json(result);
		});
	}else{
		res.json({success: false});
	}
}





/**
 * @swagger
 * models:
 *   User:
 *     id: User
 *     properties:
 *       email:
 *         type: String
 *       password:
 *         type: String
 *       steam_api_key:
 *         type: String    
 *       steam_id:
 *         type: String
 *       consumer_key:
 *         type: String
 *       consumer_secret:
 *         type: String
 *       access_token_key:
 *         type: String
 *       access_token_secret:
 *         type: String
 */