const express = require("express")
const {authUser} = require("../middlewares/auth")
const User = require("../models/user");
const { validateEditData } = require("../utils/validator");
const validator = require("validator");
const bcrypt = require("bcrypt")

const profileRouter = express.Router();

//get profile
profileRouter.get("/profile/view",authUser, async (req,res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch(err) {
            res.status(400).send("ERROR : "+err.message)
        }
})

//update the data
profileRouter.patch("/profile/edit", authUser, async (req,res) => {
    try{
        const isUpdateAllowed = validateEditData(req)
        if(!isUpdateAllowed){throw new Error("Updating this data not Allowed")}
        const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
})

//update the password
profileRouter.patch("/profile/editPassword",authUser, async (req,res) => {

    try{const user = req.user;
    const {newPassword} = req.body;
    if(!validator.isStrongPassword(newPassword)){
        throw new Error("Password is not that strong!")
    }

    const passwordHash = await bcrypt.hash(newPassword , 10);

    await User.findOneAndUpdate({_id : user._id}, {password : passwordHash});
    res.send("Your Password is updated now!")
}

    catch(err) {
        res.status(400).send("ERROR : "+ err.message)
    }

    
})


module.exports = profileRouter ;