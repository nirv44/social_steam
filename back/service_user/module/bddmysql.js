var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'my_db'
});
 
connection.connect();
 

// Exemple d'un user en bdd
//var user = {
//  id: Number,
//  email: String,
//  password: String,
//  nomTwitter: String
//};

exports.findByEmailpassUser = function(req, res) {
	connection.query('SELECT * FROM user WHERE email = ? and password = ?', [req.query.email, req.query.password], function(err, results) {
	if (err) throw err;
		res.json(results[0]);
	});
}
exports.addUser = function(req, res) {
	connection.query('INSERT INTO user SET ?', req.body, function(err, result) {
	  if (err) throw err;
	});
}


// Exemple  d'une archive en bdd
//var archive = {
//  id: Number,
//  text: String,
//  iduser: Number,
//	idtweet: Number
//};
exports.addArchive = function(req, res) {
	connection.query('INSERT INTO archive SET ?', req.body, function(err, result) {
	  if (err) throw err;
	});
}
exports.findArchiveByidUser = function(req, res) {
	connection.query('SELECT * FROM archive WHERE iduser = ?', [req.params.iduser], function(err, results) {
		res.json(results);  
	});
}


