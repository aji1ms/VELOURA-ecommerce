const mongoose = require("mongoose");

const conectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected")
    } catch (err) {
        console.log("mongoDB connection failed: ", err)
        process.exit(1);
    }
}

module.exports = conectDB;