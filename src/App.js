const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")
const {validateSignup , validateLogin} = require("./utils/validator")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const {authUser} = require("./middlewares/auth")
const cors = require("cors")

const app = express();

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authRouter")
const profileRouter = require("./routes/profileRouter")
const userRouter = require("./routes/userRouter")
const requestRouter = require("./routes/requestRouter")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", userRouter)
app.use("/", requestRouter)


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

