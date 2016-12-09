"use strict";
var fs = require('fs');


exports.recuperationInfos = function(){
    var jsonRetour = fs.readFileSync("./infos/infos.json","UTF8");
    return JSON.parse(jsonRetour);
}

