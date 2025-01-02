const express = require("express");

const app = express();

//Error Handling

//by try and catch
app.use("/getNishant", (req,res,next) => {
    try{
    console.log("Mahaan Nishant");
    throw new Error;
    res.send("success");
}
catch(err){
    res.status(404).send("catch Error")
}
})

//by own
//order of middleware param matters
app.use("/", (err , req, res, next) => {
    if(err){
        res.status(506).send("Errooorr!")
    }
})

app.listen(9999 , () => {
    console.log("Server ran succesfully...");
});
