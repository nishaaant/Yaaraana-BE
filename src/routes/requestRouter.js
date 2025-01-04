const express = require("express")
const {authUser} = require("../middlewares/auth")

const requestRouter = express.Router();

//post Send Connection Request
requestRouter.post("/sendConnectionRequest", authUser , async(req, res) => {

    try{const user = req.user;
    res.send("connection request is sent by - " + user.firstName)}
    catch(err){
        throw new Error("ERROR : " + err.message)
    }
})

module.exports = requestRouter ;