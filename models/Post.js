const mongoose = require("mongoose")
const Schema = mongoose.Schema
const PostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model("posts", PostSchema)