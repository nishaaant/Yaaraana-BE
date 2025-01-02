//importing express and mongoose
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")

const app = express();

app.use(express.json());

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

