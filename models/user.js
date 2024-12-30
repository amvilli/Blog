const mongoose = require("mongoose")
const { createHmac, randomBytes } = require("crypto")
const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: "/images/man.png"
    }
    ,
    salt: {
        type: String,
        unique: true
    }
}, { timestamps: true })


userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return;
    const salt = randomBytes(16).toString()
    const hashedpasswd = createHmac("sha256", salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashedpasswd;
    next();

})

userSchema.static("MatchPasswd", async function MatchPasswd(email, password) {

    const user = await User.findOne({ email })
    if (!user) throw new Error("User not found!")

    const salt = user.salt;
    const hashedpasswd = createHmac("sha256", salt).update(password).digest("hex");
    const userHashedPasswd = user.password;
    if (hashedpasswd !== userHashedPasswd) throw Error("Incorrect  password!")

    return true ; 

})

const User = mongoose.model("user", userSchema);
module.exports = User