const express = require("express");

const app = express();



app.get("/test/:userID/:name/:password" , (req,res) => {
    console.log(req.params)
    res.send("got it!!");
});
app.post("/test" , (req,res) => {
    res.send("posted it!!");
});
app.delete("/test" , (req,res) => {
    res.send("Deleted it!!");
});


app.use("/college" , (req,res) => {
    res.send("Gautam Buddha University");
});

app.use("/", (req,res) => {
    res.send("hello");
});
app.listen(9999 , () => {
    console.log("Server ran succesfully...");
});
