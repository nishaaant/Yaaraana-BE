const express = require("express")
const User = require("../models/user")
const {authUser} = require("../middlewares/auth")
const Connection = require("../models/connectionRequest")

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photo about skills location age gender";


//get all the requests
userRouter.get("/user/requests/received" , authUser , async (req, res) => {

    try{
        const loggedInUser = req.user ;

        const requestsInReview = await Connection.find({
            toUserId : loggedInUser._id,
            status : "like"
        }).populate("fromUserId" , USER_SAFE_DATA)


        res.json({
            message : "Requests fetched succesfully" , 
            data : requestsInReview,
    })}
    catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})

//get user connections
userRouter.get("/user/connections" , authUser , async (req, res) => {

    //logged in user can be toUserId or fromuserId
    //status = accepted
    try{

        const loggedInUser = req.user ;

        const connections = await Connection.find({
            $or : [{toUserId : loggedInUser._id},
                {fromUserId : loggedInUser._id}
            ],
            status : "accepted"
        }).populate("fromUserId" , USER_SAFE_DATA).populate("toUserId" , USER_SAFE_DATA)


        const data = connections.map((row) => {
            if (row.fromUserId._id.toString()==loggedInUser._id.toString()){return row.toUserId}
            return row.fromUserId
        })

        res.json({ data : data });


    }catch(err) {
        res.status(400).send("ERROR : "+ err.message)
    }

})

//get feed for the user
userRouter.get("/feed",authUser , async (req,res) => {
    try{
        const loggedInUser = req.user ;
        
        const page = parseInt(req.query.page) || 1 ;
        let limit = parseInt(req.query.limit) || 10 ;
        limit = limit>50 ? 50 : limit ;
        const skip = (page - 1)*limit ;



        const dataToHide = await Connection.find({
            $or : [{
                fromUserId : loggedInUser._id
            },{
                toUserId : loggedInUser._id
            }]
        }).select("fromUserId toUserId")

        const hideUserId = new Set();

        dataToHide.forEach((requests) => {
            hideUserId.add(requests.fromUserId.toString()),
            hideUserId.add(requests.toUserId.toString())
        })

        const users = await User.find({
            $and :  [
                {_id :{ $nin : Array.from(hideUserId)}},
                {_id : {$ne : loggedInUser._id}}]
            })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit)

 
        res.send(users);
    }
    catch(err) {
        res.status(400).send("ERROR : "+err.message)
    }
})

module.exports = userRouter ;