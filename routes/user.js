const express = require('express');
const multer = require("multer")
const path = require("path")
const router = express.Router()
router.use(express.static(path.resolve("../public/uploads")))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, (__dirname ,"./public/uploads"));
    },
    filename: function (req, file, cb) {

        return cb(null, `${Date.now()}${file.originalname}`)
    }
})



const upload = multer({ storage })

const { HandleUserSignUpGetReq, HandleUserSignUpPostReq, HandleLoginPostReq, HandleLoginGetReq } = require("../controllers/user");
router.route("/").get(HandleUserSignUpGetReq)
router.post("/", upload.single("profileImage"), HandleUserSignUpPostReq)
router.route("/login").get(HandleLoginGetReq).post(HandleLoginPostReq)


module.exports = router