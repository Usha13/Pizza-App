const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username : { type : String, required : true  },
    email : { type : String, required : true  },
    password : { type : String, required : true  },
    role : { type : String, default : 'customer' },
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)