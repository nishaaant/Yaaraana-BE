const express = require("express")
const {authUser} = require("../middlewares/auth")
const Connection = require("../models/connectionRequest")
const User = require("../models/user")

const requestRouter = express.Router();

//post Send Connection Request
requestRouter.post("/request/send/:status/:userId", authUser , async(req, res) => {

    try{

        const fromUserId = req.user._id ;
        const toUserId = req.params.userId ;
        const statusData = req.params.status ;

        const toUser = await User.findById(toUserId);
        if(!toUser){return res.json({message : "Invalid User"})}

        const statusAllowed = ["like","ignore"];
        if(!statusAllowed.includes(statusData)){return res.json({message : statusData +" status not allowed"})}

        const isConnectionExists = await Connection.findOne({
            $or : [ {fromUserId , toUserId},
                {fromUserId : toUserId , toUserId : fromUserId}
            ]
        })
        if(isConnectionExists){return res.json({message : "Connection already Exists"})}

        const newConnection = new Connection({
            fromUserId : fromUserId,
            toUserId : toUserId,
            status : statusData
        })

        const data = await newConnection.save()
        res.json({
            message : req.user.firstName +" "+ statusData +" "+ toUser.firstName,
            data : data
        })
    }
    catch(err){
        res.status(400).send("ERROR " + err.message)
    }
})

//post Recieved Connection Requests
requestRouter.post("/request/review/:status/:requestId" , authUser , async (req, res) => {

    try{

        const loggedInUser = req.user ;
        const {status , requestId} = req.params ;

        const statusAllowed = ["accepted" , "rejected"];

        if(!statusAllowed.includes(status)){return res.json({message : "Status not Allowed"})};

        const currentRequest = await Connection.findOne({
            _id : requestId ,
            toUserId : loggedInUser._id, 
            status : "like"
        })
        if(!currentRequest){return res.json({message : "Connection Request not Valid!"})};

        currentRequest.status = status ;
        const data = await currentRequest.save();

        res.json({
            message : "Request " + status + " succesfully" , data
        })


    }catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = requestRouter ;