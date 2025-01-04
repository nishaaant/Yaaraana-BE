const validator = require("validator");

const validateSignup = (req) => {

    const {firstName, lastName, emailID, password} = req.body ;

    if(!firstName || !lastName)
    {
        throw new Error("Name is not valid!")
    }
    else if(!validator.isEmail(emailID))
    {
        throw new Error("Email is not valid!")
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Password is not that Strong!!")
    }
}

const validateLogin = (req) => {

    const {emailID, password} = req.body ;

    if(!validator.isEmail(emailID))
    {
        throw new Error("Email is not valid!")
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Password is not that Strong!!")
    }
}

const validateEditData = (req) => {

    const allowedUpdates = ["firstName","middleName","lastName","age","gender","location","about","photo","skills"];

    const isUpdateAllowed = Object.keys(req.body).every((key) => allowedUpdates.includes(key))
    
    return isUpdateAllowed;
    
}

module.exports = {
    validateSignup, validateLogin, validateEditData
}