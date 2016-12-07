var fs = require('fs');
var child_process = require('child_process');

var nbErreur = 0;

/*
gestion.recuperationInfos(function(retour){
    console.log(retour);
});
*/
exports.recuperationInfos = function(res){
    var jsonRetour = fs.readFileSync("./infos/infos.json","UTF8");
    res(JSON.parse(jsonRetour));
}



// gestion des erreur ici
exports.gestionErreur= function(req){
    nbErreur = nbErreur + 1;
    if(error.code === "ECONNREFUSED"){
        console.log("Service "+ donns[0] +" down");
    }else{
        console.log("Erreur avec le service");
    }
    console.log("Nombre d'erreur : " + nbErreur);
}



exports.reexecuteService = function(){
    child_process.exec('../reexecute.bat', function(error, stdout, stderr) {
        console.log(stdout);
    });
}


// Exemple a remettre dans le user gateway
exports.checkifplaying = function(req, res){
    var userid = req.body.iduser;
    var hostSteam = "http://127.0.0.1:3003";
    var hosttwitter = "http://127.0.0.1:3002";


    security.contacterServiceForToken(hostSteam, function(token){
        var client = new restclient();
        var arg = {
            headers: 
                {
                    "Content-Type": "application/json",
                    "token": token
                }
        };

        // je regarde les infos du user
        client.get(hostSteam+"/steam/"+req.params.iduser, arg, function(data, response) {
            if(data != null){
                // si en réponse j'ai bien un gameid alors jenvoi l'info a tweet/fb
                if(data.gameid != null || data.gameid > 0){
                    // TWITTER
                    security.contacterServiceForToken(hosttwitter, function(token) {

                        var nomdujeux = "";
                        
                        var client2 = new restclient();
                        var arg2 = {
                            headers:
                            {
                                "Content-Type": "application/json",
                                "token": token,
                                "iduser":req.params.iduser,
                                "tweet": "Hey mec je joue a"+ nomdujeux + " !"
                            }
                        }
                        client2.post(hosttwitter+"/sendtweet", arg, function(aller, responseTwitter){
                            
                        });
                    });

                    //FB
                }
            }
        });

    });

}
