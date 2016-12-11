"use strict";
var mysql      = require('mysql');

var	secure = require('./security');


var connection = mysql.createConnection({
  host     : 'bhae1ssel-mysql.services.clever-cloud.com',
  user     : 'ukadr2ogkkznuk4d',
  password : 'P7niK0yqRUcZ70pcDk0',
  database : 'bhae1ssel'
});
 
connection.connect(function(err) {
	if(err){
		console.log("Il faut penser a démarer et créer la base de donnée");
		console.log("________");
		console.log("table : user");
		console.log("id: int,  email: String,  password: String, steam_api_key: String, steam_id: String, consumer_key: String,consumer_secret: String, access_token_key: String, access_token_secret: String");
		console.log("error : ", err);
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