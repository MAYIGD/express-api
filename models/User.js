const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model("users", UserSchema)