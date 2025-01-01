const express = require("express");

const app = express();

app.use(
    "/test" ,
    (req,res,next) => {
        console.log("1");
    // res.send("posted it!!1");
    next();
},
(req,res,next) => {
    console.log("2");
    // res.send("posted it!!2");
    next();
},
(req,res,next) => {
    console.log("3");
    res.send("posted it!!3");
    next();
}
);


app.listen(9999 , () => {
    console.log("Server ran succesfully...");
});
