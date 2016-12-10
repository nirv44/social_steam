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



exports.cherchetoken = function(iduser){
	connection.query('SELECT * FROM user WHERE id = ?', iduser, function(err, results) {
		if (err){
			return null;
		}
		return JSON.stringify(results[0]);
	});
}