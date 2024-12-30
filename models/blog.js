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
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true })

const Blog = mongoose.model("blog", userBlog);
module.exports = Blog;