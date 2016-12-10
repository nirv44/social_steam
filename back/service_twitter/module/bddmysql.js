/**
 * @swagger
 * resourcePath: /
 * description: service Twitter
 */
"use strict";
var mysql      = require('mysql');

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
		console.log("________");
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
exports.cherchetoken = function(iduser){
	connection.query('SELECT * FROM user WHERE id = ?', iduser, function(err, results) {
		if (err){
			return null;
		}
		return JSON.stringify(results[0]);
	});
}