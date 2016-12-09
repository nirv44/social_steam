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
  console.log("Il faut penser a démarer la base de donnée");
});
 


exports.chercheKeyAndId = function(iduser){
	connection.query('SELECT * FROM user WHERE iduser = ?', iduser, function(err, results) {
		if (err){
			return null;
		}
		return JSON.stringify(results[0]);
	});
}