const mongoose = require("mongoose")

const userBlog = new mongoose.Schema({

    title: {
        type: String,
        required: true,

    },
    body: {
        type: String,
        required: true,

    },
    blogImg : {
        type : String ,
        default : "/images/3e5f460b6da06c8a302620f90bfdb2fa.jpg"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true })

const Blog = mongoose.model("blog", userBlog);
module.exports = Blog;