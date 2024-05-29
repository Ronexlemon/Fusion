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
    
    product_No:{
        type:Schema.Types.String,
        required:true,
    },
    Product_Image:{
        type:String,
        required:false,
    },

    product_track:{
        type:String,
        required:true,
        enum:['available','ondelivery','sold'],
        default:'available'
    }
    

},
{timestamps:true})


module.exports = mongoose.models.Product || mongoose.model("Product", ProductSchema);