//importing express and mongoose
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")

const app = express();

app.post("/signup", (req,res) => {
    const user = new User({
        firstName : "Shobhit",
        lastName : "Yadav",
        emailID : "Shobhit@Yadav123",
        password : "1409",
        age : 23,
        gender : "Male",
        location : "Vasundhra"
    })

    user.save()
    res.send("User added Succesfully")
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

