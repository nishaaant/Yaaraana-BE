const express = require("express")
const {authUser} = require("../middlewares/auth")
const User = require("../models/user")

const profileRouter = express.Router();

//get profile
profileRouter.get("/profile",authUser, async (req,res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch(err) {
            res.status(400).send("ERROR : "+err.message)
        }
})

//update the data
profileRouter.patch("/user/:userId", async (req,res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES =["firstName","middleName", "lastName", "password", "age", "gender", "location", "about", "photo", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){throw new Error("Update Not ALLOwed");}
        if(data?.skills.length > 10){throw new Error("Skills cannot be more than 10");}
        const user = await User.findByIdAndUpdate(userId, data , {returnDocument:'before',runValidators:true});
        console.log(user)
        res.send("Updated the user succesfully");
    }
    catch(err) {
        res.status(400).send("ERROR : "+err.message)
    }
})


module.exports = profileRouter ;