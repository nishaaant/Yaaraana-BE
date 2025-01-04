const jwt =  require("jsonwebtoken")
const User = require("../models/user")

const authUser = async (req, res, next) => {
    
    try{
        const {token} = req.cookies;
        if(!token){throw new Error("Token not Valid")}

    const decodedMessage = await jwt.verify(token , "nishant@mahaan")

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