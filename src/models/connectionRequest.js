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

connectionRequestSchema.pre( "save" , function () {
    if(this.fromUserId.equals(this.toUserId)) {
        throw new Error ("cannot send request to yourself na buddy !!")
    }
})

module.exports = mongoose.model("Connection", connectionRequestSchema)