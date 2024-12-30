const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const HomeRoute = require("./routes/home")
const BlogRoute = require("./routes/blog")
const commentRoute = require("./routes/comment.js")
const userRoute = require("./routes/user")
const cookieParser = require("cookie-parser")
const {HandleMongoDBConnection} = require ("./connections/connect.js")
const { CheckUserAuth} = require("./middlewares/auth.js")
const app = express();

//MongoDBconnection ..
HandleMongoDBConnection("mongodb://127.0.0.1:27017/blog2")

// Middlewares .. 
app.use(express.static(path.resolve("./public/")))
app.use(express.static(path.resolve("./public/uploads")))
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs")
app.set("view path ", path.resolve("./views"))
app.use(CheckUserAuth("token"));


// Routes..
app.use("/", HomeRoute)
app.use("/blog", BlogRoute)
app.use("/user", userRoute)
app.use("/comment", commentRoute)
app.get("/user/logout", (req,res)=>{

    res.clearCookie("token").redirect("/")
})

app.listen(8000, () => {
    console.log(`Server started on port`);
});