const User = require("../models/user");
const { SetUser } = require("../services/auth");
const { HandelBlogGetReq } = require("./blog");

async function HandleUserSignUpGetReq(req, res) {
    res.render("signup")

}

async function HandleUserSignUpPostReq(req, res) {
    const { fullname, email, password } = req.body;
    console.log(req.file)
    try {

        const createdUser = await User.create({
             fullname , 
             email,
             password,
            profileImage :`${req.file.filename}`
            })

         res.redirect('/user/login');
    }
    catch (error) {
        console.log("Error user.js 19 : ", error)
        res.render("signup", { error: " failed to register" })
        if (error.code === 11000) {
            res.render("signup", { error: " Email not availabe" })
        }
    }

}

async function HandleLoginGetReq(req, res) {

    res.render("login")
}
async function HandleLoginPostReq(req, res) {
    const { email, password } = req.body;
    try {
        const  validateUser = await User.MatchPasswd( email, password)
    
        if(!validateUser) return res.render("signup", {error:Error})
        const user = await User.findOne({email})
        const token = SetUser(user)
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
        })
        res.render("home", { user: user })
    } catch (error) {
        console.log("Error : 45 ", error)
        res.render("login", { error: "404 Not found!  " })
    }

}
module.exports = { HandleUserSignUpGetReq, HandleUserSignUpPostReq, HandleLoginGetReq, HandleLoginPostReq }