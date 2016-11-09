var steam = require('steam-web');


var bdd = require('./module/bddmysql');
var secure = require('./module/security');


// Prepare les infos du compte Steam
prepareClientSteam = function(iduser){
	
	var saller = null;
	var letout = bdd.chercheKeyAndId(iduser);

	if (letout != null) {
		saller[0] = new steam({
		  apiKey: letout.steam_api_key,
		  format: 'json'
		});
		saller[1] = letout.steam_id;
	}

	return s;
}


exports.getInformationSteamByUser = function(req, res) {
	var recupe = secure.verifytoken(req);
	if(recupe != null){

		var sretour = prepareClientSteam(req.body.iduser);
		var s = sretour[0];
		var steamids = sretour[1];


		if(s != null){
			if (steamids != null) {

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

	}
}






