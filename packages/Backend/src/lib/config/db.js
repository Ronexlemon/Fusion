
const mongoose = require('mongoose');
require('dotenv').config();


const connect = async () => {
    if (mongoose.connection.readyState !== 1) {
        try {
           
            await mongoose.connect(process.env.MONGO_URL);

            console.log("MongoDB connection success");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw new Error("Error connecting to MongoDB");
        }
    }
};

module.exports = connect;