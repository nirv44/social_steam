
var Twitter = require('twitter');


// Clé perso (pas fair de betise avec hein) !
var client = new Twitter({
	consumer_key: 'zYq86k1StLfT5G4Y1UzkcG7Oi',
	consumer_secret: '68r1IG0Eof1X6RYNFUpSKJPXmR8HxMBdqUlhKfLBxbcXxwZAUf',
	access_token_key: '612775154-SRaqqGc72JUejiXrr6HaZH9gdYXOBD8M4qvLY8bv',
	access_token_secret: 'hTB9nEmvZitqNJ2NodGmOqLKGKfyJ1qqm4kNlcZwXDr5d'
});
 

// Hop on va chercher les 10 derniers twwet du non tweeter passer
exports.lasttweet = function (req, res) {
	client.get('statuses/home_timeline', {screen_name: req.params.nomTwitter, count:10}, function(error, tweets, response) {
		res.json(changerFormat(tweets));
	});
}


// la je ne ramene que l'id et le text du tweet
changerFormat = function(tweets){
	var retourPrepa = "";
	var retour = "";

	for (var i = 0; i < tweets.length; i++) {
		retourPrepa = JSON.stringify({ idtweet: tweets[i].id, text: tweets[i].text });
		if(i != 0){
			retour = retour +", "+ retourPrepa;
		}else{
			retour = retourPrepa;
		}
	}
	
	return "[" +retour + "]";
}