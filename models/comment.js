const mongoose = require("mongoose")

const userComment = new mongoose.Schema({

    body: {
        type: String,
        required: true,

    },
    createdBy: {
        type: String,
        ref: "user"
    },
    blog: {
        type: String,
        ref: "blog"
    }
}, { timestamps: true })

const Comment = mongoose.model("comment", userComment);
module.exports = Comment