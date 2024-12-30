const express = require('express');
const router =  express.Router()
const { HandleUserCommentPostReq } = require ("../controllers/commet.js")

router.post("/:id", HandleUserCommentPostReq)

module.exports =  router