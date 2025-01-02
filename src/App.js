const express = require("express");

const app = express();

const {authAdmin,authUser} = require("./middlewares/auth")

//Admin auths
app.use("/admin", authAdmin);

app.get("/admin/getAllData", (req, res, next) => {
    res.send("Got all data");
    next();
})

app.get("/admin/deleteAllData", (req, res, next) => {
    res.send("Deleted all data");
    next();
})


//user Auths
app.get("/user/login", (req, res, next) => {
    res.send(" Logged in ");
})

app.use("/user", authUser);

app.get("/user/getAllData", (req, res, next) => {
    res.send("Got all data");
    next();
})

app.get("/user/deleteAllData", (req, res, next) => {
    res.send("Deleted all data");
    next();
})


app.listen(9999 , () => {
    console.log("Server ran succesfully...");
});
