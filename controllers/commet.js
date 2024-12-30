const Blog = require("../models/blog");
const Comment = require("../models/comment.js");

async function HandleUserCommentPostReq(req, res) {
    console.log(req.params.id,"ID -> comment/:ID")
    if (!req.user) res.redirect('/user/login');
    let CurrentBlog;
    try {
        const CreatedComment = await Comment.create({

            body: req.body.comment,
            createdBy: req.user._id,
            blog: req.params.id
        })
    
        CurrentBlog = await Blog.findOne({ _id: req.params.id }).populate("createdBy")
        allcomments = await Comment.find({blog:req.params.id}).populate("createdBy")
        res.render("viewblog", { blog: CurrentBlog, user: CurrentBlog.createdBy , comments : allcomments})

    } catch (error) {
        console.log('Error : 13 commentjs', error)
        res.render("viewblog", { blog: CurrentBlog });
    }

}

module.exports = { HandleUserCommentPostReq }