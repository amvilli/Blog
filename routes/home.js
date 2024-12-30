const express = require('express');
const router = express.Router();
const {  HandleHomeGetReq, } = require('../controllers/home')

router.get("/", HandleHomeGetReq)

module.exports = router 
