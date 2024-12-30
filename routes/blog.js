const express = require('express');
const router = express.Router()
const { HandelBlogGetReq, HandleBlogPostReq , HandleBlogCreateGetReq ,HandleSingleBlogViewReq}  = require ("../controllers/blog.js")

router.route("/").get(HandelBlogGetReq).post(HandleBlogPostReq)
router.get("/create" ,HandleBlogCreateGetReq)
router.get("/:id" , HandleSingleBlogViewReq)

module.exports =  router

