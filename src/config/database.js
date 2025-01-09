const mongoose = require("mongoose");

const connectDB = async() => {
    await(
        mongoose.connect(
            "mongodb+srv://learnnode-username:learnmongodb1@learnnode-cluster.jpymb.mongodb.net/Yaaraana/retryWrites=true"
            )
    )
}
module.exports = connectDB;


