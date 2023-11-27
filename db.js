const mongoose = require('mongoose');
function mongoConnect(url){
    return mongoose.connect( url )
    .then(()=>console.log("Connection Successful..."))
    .catch((err)=>console.log(err)); 
}

module.exports = mongoConnect;