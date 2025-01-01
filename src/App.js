const express = require("express");

const app = express();

// app.use("/", (req,res) => {
//     res.send("hello")
// });
app.use("/surname" , (req,res) => {
    res.send("Rajput")
});
app.use("/college" , (req,res) => {
    res.send("Gautam Buddha University")
});

app.listen(1608 , () => {
    console.log("Server ran succesfully...")
});
