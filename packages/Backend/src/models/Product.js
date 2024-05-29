const { Timestamp } = require("mongodb");
const mongoose = require("mongoose")

const {Schema} = mongoose;

const  TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
       
      },
    
    amount:{
        type:String,
        required:false,
    },
    month:{
        type:String,
        required:false,
    },
    transactionType:{
        type:String,
        required:true,
        enum:['utility','friends','transfers'],
        default:'utility'
    }
    

},
{timestamps:true})


module.exports = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);