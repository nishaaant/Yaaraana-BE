//importing express and mongoose
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")

const app = express();

app.use(express.json());

//get data by user id
app.get("/user", async (req,res) => {
    const userloc = req.body.location;
    console.log(userloc)
    try{
        const user = await User.findOne({location : userloc})
        if(!user){
            res.status(404).send("User not Found")
        }else{
            res.send(user)
        }
    }
    catch(err) {
        res.status(400).send(err.message)
    }
})

//get all the users
app.get("/feed", async (req,res) => {
    try{
        const users = await User.find({})
        if(users.length == 0){
            res.status(404).send("No Data")
        }else{
            res.send(users)
        }
    }
    catch(err) {
        res.status(400).send(err.message)
    }
})

//post user data
app.post("/signup", async (req,res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.send("User added Succesfully")
    }
    catch(err) {
        res.status(400).send(err.message)
    }
})

//delete the user
app.delete("/user", async (req, res) => {
    const userId = req.body._id;
    try{
        await User.findByIdAndDelete(userId);
        res.send("Deleted the user succesfully");
    }
    catch(err) {
        res.status(400).send(err.message)
    }

})

//update the data
app.patch("/user/:userId", async (req,res) => {
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
        res.status(400).send(err.message)
    }
})

// connecting database.js where connected the cluster after that only express will recieve API requests 
// thats why wrote listen in the connect codee - Nishant
connectDB().then(()=> {
    console.log("Database connected!!")
    app.listen(9999 , () => {
        console.log("Server ran succesfully...");
    });
}).catch((err)=> {
    console.log("Database not connected!!")
})

