const express = require("express")
const User = require("../models/user")

const userRouter = express.Router();

//get all the users
userRouter.get("/user/feed", async (req,res) => {
    try{
        const users = await User.find({})
        if(users.length == 0){
            res.status(404).send("No Data")
        }else{
            res.send(users)
        }
    }
    catch(err) {
        res.status(400).send("ERROR : "+err.message)
    }
})

module.exports = userRouter ;