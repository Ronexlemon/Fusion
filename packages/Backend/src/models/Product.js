const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const { type } = require("os");

const {Schema} = mongoose;

const  ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
       
      },
      amount:{
        type:String,
        required:true

      },
      seller_phonenumber:{
        type:String,
        required:true

      },
        
    Product_Image:{
        type:String,
        required:false,
    },

    product_track:{
        type:String,
        required:true,
        enum:['unlisted','available','ondelivery','sold'],
        default:'unlisted'
    },
    Product_name:{
        type:String,
        required:true,
    },
    Product_description:{
        type:String,
        required:true,
    },

    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
    }
    

},
{timestamps:true})


module.exports = mongoose.models.Product || mongoose.model("Product", ProductSchema);