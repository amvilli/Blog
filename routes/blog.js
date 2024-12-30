const express = require('express');
const router = express.Router()
const { HandelBlogGetReq, HandleBlogPostReq , HandleBlogCreateGetReq ,HandleSingleBlogViewReq}  = require ("../controllers/blog.js")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, (__dirname ,"./public/uploads"));
    },
    filename: function (req, file, cb) {

        return cb(null, `${Date.now()}${file.originalname}`)
    }
})



const upload = multer({ storage })

router.route("/").get(HandelBlogGetReq)
router.post("/", upload.single("blogImg"), HandleBlogPostReq)
router.get("/create" ,HandleBlogCreateGetReq)
router.get("/:id" , HandleSingleBlogViewReq)

module.exports =  router

