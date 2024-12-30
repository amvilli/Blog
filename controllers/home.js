const User = require("../models/user")

async function HandleHomeGetReq(req, res) {
    if (req.user) return res.render("home")

    res.render("home")
}


// Exports .. 
module.exports = { HandleHomeGetReq }