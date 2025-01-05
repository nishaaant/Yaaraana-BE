const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    
    fromUserId : {
        type : mongoose.Schema.ObjectId ,
        required : true
    },

    toUserId : {
        type : mongoose.Schema.ObjectId ,
        required : true 
    },

    status : {
        type : String,
        required : true,
        enum : {
            values : ["ignore","like","accepted","rejected"],
            message : `This status is not here - {VALUE}`
        }
    }
})

connectionRequestSchema.index({fromUserId : 1 , toUserId : 1})

connectionRequestSchema.pre( "save" , function (next) {
    if(this.fromUserId.equals(this.toUserId)) {
        throw new Error ("cannot send request to yourself na buddy !!")
    }
    next();
})

module.exports = mongoose.model("Connection", connectionRequestSchema)