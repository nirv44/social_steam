
var fs = require('fs');


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
