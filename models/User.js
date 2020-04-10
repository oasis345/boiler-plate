const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true, // 띄어쓰기 같은 것 지워준다.
        unique: 1
    },
    password:{
        type : String,
        maxLength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type : String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model("User",userSchema)

module.exports = { User }