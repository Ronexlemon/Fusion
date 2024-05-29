const asyncHandler = require("express-async-handler")

const {getAllTotal,getAllFriendsTransaction,getAllUtilityTransaction,getAllTransactions,getAllTransfersTransaction,getAllFriendsTotalTransaction,getAllUtilityTotalTransaction,createTransaction,getAllMonthTotal} = require("../../services/transaction/transaction")




const createATransaction = asyncHandler(async(req,res)=>{
   
    
    const {transanctiontype,amount,month} = req.body;
    try{

        const transaction = await createTransaction(req.user.id,transanctiontype,amount,month);
        if(!transaction || transaction.length ==0){
            return res.status(404).json({
                status:false,
                message:"No transactions Created"
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