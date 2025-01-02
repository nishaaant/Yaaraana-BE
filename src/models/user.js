const mongoose = require("mongoose")

//created schema
const userSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    emailID : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    },
    location : {
        type : String
    },
})


//exported schema via User Model
module.exports = mongoose.model("User", userSchema);