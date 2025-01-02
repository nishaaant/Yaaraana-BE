//importing express and mongoose
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")

const app = express();

app.use(express.json());

//get data by user id
app.get("/user", async (req,res) => {
    const userID = req.body._id;
    try{
        const user = await User.findById(userID)
        if(!user){
            res.status(404).send("User not Found")
        }else{
            res.send(user)
        }
    }
    catch(err) {
        res.status(400).send("Error Faced")
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
        res.status(400).send("Error Faced")
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
        res.status(400).send("Error Faced")
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

