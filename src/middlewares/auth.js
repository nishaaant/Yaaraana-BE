const authAdmin = (req, res, next) => {
    console.log("Admin Auth called!!");
    const token = "xyz";
    const isAdminAuthorised = "xyz";
    if(isAdminAuthorised == token){
        next();
    }else{
        res.status(401).send("Unauthorised Admin");
    }
}

const authUser = (req, res, next) => {
    console.log("User Auth called!!");
    const token = "xyz";
    const isAdminAuthorised = "xyza";
    if(isAdminAuthorised == token){
        next();
    }else{
        res.status(401).send("Unauthorised user");
    }
}

module.exports = {
    authAdmin,authUser
}