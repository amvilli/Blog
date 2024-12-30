const JWT = require("jsonwebtoken")
const User = require("../models/user")


const SecretKey = "@passwd123"

function SetUser(user) {

    const payload = {
        _id : user._id,
        email : user.email
    }
   const token =  JWT.sign(payload, SecretKey)
   return token 
}



function GetUser  (token){

     return JWT.verify(token, SecretKey)
}
module.exports ={ GetUser ,SetUser}