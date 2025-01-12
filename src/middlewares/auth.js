const jwt =  require("jsonwebtoken")
const User = require("../models/user")
require("dotenv").config();

const authUser = async (req, res, next) => {
    
    try{
        const {token} = req.cookies;
        console.log(req.cookies)
        if(!token){
            return res.status(401).send("Please Login!")
        }

    const decodedMessage = await jwt.verify(token , process.env.JWT_TOKEN)

    const {_id} = decodedMessage;

    const user = await User.findById(_id);
    if(!user){throw new Error("User not Available!")}

    req.user = user;
    next();
}
    catch(err){
        res.status(400).send("ERORR : " + err.message)
    }
}

module.exports = {
    authUser
}