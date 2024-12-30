const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");


async function HandelBlogGetReq(req, res) {
    if (!req.user) return res.render("blog");

    try {
        const Allblogs = await Blog.find({})
        const user = await User.findOne({ email: req.user.email })
        res.render("blog", { blogs: Allblogs, user: user });

    } catch (error) {
        console.log("Error : 11 ", error)
    }
}



async function HandleBlogCreateGetReq(req, res) {

    
    if (!req.user) return res.redirect("/user/login")
    const currentuser = await User.findOne({_id : req.user._id})
    res.render("addblog", { user: currentuser })
}


async function HandleBlogPostReq(req, res) {

    if (!req.user) return res.redirect("/user/login")

    const { title, body, createdBy } = req.body
    try {
        const createdBlog = await Blog.create({ title, body, createdBy: req.user._id })
        res.redirect(`/blog/${createdBlog._id}`);
    }
    catch (error) {
        res.render("addblog", { error: "error generating blog !" });
        console.log("Error > blog.js : 11 ", error)
    }

}
async function HandleSingleBlogViewReq(req, res) {
console.log(req.params.id, " ID ")
// console.log(req, " req OBKECT")
    const reqBlog = await Blog.findOne({ _id : req.params.id})
    const currentuser = await User.findOne({ email: req.user.email })
    const allcomments = await Comment.find({ blog: req.params.id }).populate("createdBy")
    res.render("viewblog", { blog: reqBlog, user: currentuser, comments: allcomments })

}

module.exports = { HandelBlogGetReq, HandleBlogPostReq, HandleSingleBlogViewReq, HandleBlogCreateGetReq }