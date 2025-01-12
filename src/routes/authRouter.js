const express = require("express");
const bcrypt = require("bcrypt")
const { validateSignup, validateLogin} = require("../utils/validator")
const User = require("../models/user");


const authRouter = express.Router();

//post signup
authRouter.post("/signup", async (req,res) => {
    
    try{
        
        const {firstName , lastName , emailID , password} = req.body;
        //validating signup data
        validateSignup(req);
        //encrypting password for security
        const passwordHash = await bcrypt.hash(password , 10);
        
        const user = new User({firstName , lastName , emailID , password : passwordHash})
        const newUser = await user.save()

            const token = await newUser.getJWT();

            res.cookie("token",token , {
                httpOnly: true,
                secure: true,
            });

        res.json({
            message : "New User Added Succesfully!",
            data : newUser
        })
    }
    catch(err) {
        res.status(400).send("ERROR : "+err.message)
    }
})


//post login
authRouter.post("/login" , async (req, res) => {

    try{

        const{emailID , password} = req.body;

        validateLogin(req);
    
        const user = await User.findOne({emailID : emailID})
        if(!user){throw new Error ("Invalid Credentials!! Please re-check email and password")}
    
        const isPasswordCorrect = await user.validatePassword(password);

        if(isPasswordCorrect){

            const token = await user.getJWT();

            res.cookie("token",token , {
                httpOnly: true,
                secure: true,
            });
            res.send(user);
        }else{throw new Error ("Invalid Credentials!! Please re-check email and password")}
    }
    catch(err) {
        res.status(400).send("ERROR : "+err.message)
    }
})

//post logout
authRouter.post("/logout" , async (req, res) => {
    res.cookie("token", null,{
        expires : new Date(Date.now())
    })
    res.send("Logout Succesfull!")
})

module.exports = authRouter ;