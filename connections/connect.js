const { default: mongoose } = require("mongoose")


async function HandleMongoDBConnection(url){
    return   mongoose.connect(url).then(console.log("MongoDB established!")).catch((error)=>{console.log("Error DB connection!")})
}
module.exports = { HandleMongoDBConnection}