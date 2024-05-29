const { Timestamp } = require("mongodb");
const mongoose = require("mongoose")

const {Schema} = mongoose;

const  UserSchema = new Schema({
    phoneNumber:{
        type:String,
        unique:true,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },


},
{timestamps:true})


module.exports = mongoose.models.User || mongoose.model("User", UserSchema);