"use strict";
var fs = require('fs');
var child_process = require('child_process');

var nbErreur = 0;


exports.recuperationInfos = function(){
    var jsonRetour = fs.readFileSync("./infos/infos.json","UTF8");
    return JSON.parse(jsonRetour);
}



// gestion des erreur ici
exports.gestionErreur= function(req){
    nbErreur = nbErreur + 1;
    console.log("reqcode " + req.code);
    if(req.code === "ECONNREFUSED"){
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

