const { SetUser, GetUser } = require("../services/auth");

function CheckUserAuth(token) {
    return (req, res, next) => {
        const token = req.cookies?.token;
        // console.log(token, "token")

        if (!token) return next()
        try {
            const user = GetUser(token);
            req.user = user;
            next()
        } catch (error) {

            console.log("Error : 15 ", error)
            next()
        }
    }
}
module.exports = { CheckUserAuth }