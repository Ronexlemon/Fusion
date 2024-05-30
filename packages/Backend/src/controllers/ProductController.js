const asyncHandler = require("express-async-handler")

const {createProduct,getAllAvailabeProductTotal,getAllAvailableProducts,getAllBuyersProducts,getAllBuyersBoughtProducts,getAllBuyersSoldProducts,getAllDeliveryProductTotal,getAllSoldProduct,getAllSoldProducts,getAllTotal,getAllUserDeliveryTransaction,getAllUserProducts} = require("../services/product/product")




const createAProduct = asyncHandler(async(req,res)=>{
   // user_id,product_track,amount,product_image,
   
    
    const {product_track,amount,product_image} = req.body;
    try{

        const transaction = await createProduct(req.user.id,product_track,amount,product_image);
        if(!transaction || transaction.length ==0){
            return res.status(404).json({
                status:false,
                message:"No product Created"
            })
        }
        await transaction.save();
        return res.status(200).json({message:"created successively"}          
        );
    }catch(error){
        console.log("error",error)
        return res.status(500).json({message:"please try another time"})

    }

    
})



const getAllTransaction = asyncHandler(async(req,res)=>{
   
    try{

        const transactions = await getAllTransactions(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No transactions found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})

//get all friends transactions
const getFriendsTransaction = asyncHandler(async(req,res)=>{
    
    try{

        const transactions = await getAllFriendsTransaction(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No transactions found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})

//get all friends transactions
const getUtilityTransaction = asyncHandler(async(req,res)=>{
    
    try{

        const transactions = await getAllUtilityTransaction(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No transactions found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})


//get all friends transactions
const getTransfersTransaction = asyncHandler(async(req,res)=>{
   
    try{

        const transactions = await getAllTransfersTransaction(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No transactions found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})



//total

const getTotalAmount = asyncHandler(async(req,res)=>{
   
    try{

        const transactions = await getAllTotal(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No transactions found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})


//get all mont total

const getTotalMonthAmount = asyncHandler(async(req,res)=>{
   
    const {month} = req.body
    try{

        const transactions = await getAllMonthTotal(req.user.id,month);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No transactions found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})


module.exports ={createATransaction,
getTotalAmount,
getAllTransaction,
getTotalMonthAmount,
getFriendsTransaction,
getUtilityTransaction,
getTransfersTransaction}