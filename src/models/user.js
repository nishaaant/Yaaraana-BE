const mongoose = require("mongoose")
var validator = require('validator');
const { default: isEmail } = require("validator/lib/isEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require("dotenv").config();

//created schema
const userSchema = new mongoose.Schema({
    firstName : {
        type : String ,
        required : true,
        trim : true,
        maxLength : 20
    },
    middleName : {
        type : String,
        trim : true,
        maxLength : 20
    },
    lastName : {
        type : String,
        trim : true,
        maxLength : 20
    },
    emailID : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        minlength: 8,
        maxLength : 20,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){throw new Error ("invalid Email ID")}
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        validate(value){
            if(!validator.isStrongPassword(value)){throw new Error ("try to keep a strong password")}
        }
    },
    age : {
        type : Number,
        min : 18,
    },
    gender : {
        type : String,
        enum : {
            values : ["Male","Female","Others"],
            message : `Gender can only be Male, Female or Others`
        }
    },
    location : {
        type : String,
        minLength : 8,
        maxLength : 20
    },
    about : {
        type : String,
        default : "Random person - Default About Section",
        minLength : 15,
        maxLength: 50
    },
    photo : {
        type : String,
        default : "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png",
        validate(value){
            if(!validator.isURL(value)){throw new Error ("invalid URL")}
        }
    },
    skills : {
        type : [String],
    }
},
{timestamps : true}
)

//user Schema Methods

//login jwt token 

userSchema.methods.getJWT = async function () {
    const user = this;
    
    const token = await jwt.sign({_id : user._id}, process.env.JWT_TOKEN , {expiresIn : '7d'});

    return token;
}

//login password validation

userSchema.methods.validatePassword = async function(passwordEnteredByUser) {
    const passwordHash = this.password;

    const isPasswordCorrect = await bcrypt.compare(passwordEnteredByUser,passwordHash)

    return isPasswordCorrect;
}


//exported schema via User Model
module.exports = mongoose.model("User", userSchema );