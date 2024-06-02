const asyncHandler = require("express-async-handler")

const {createProduct,getAllUnlistedProducts,listProduct,getAllAvailabeProductTotal,getAllAvailableProducts,getAllBuyersProducts,getAllBuyersBoughtProducts,getAllBuyersSoldProducts,getAllDeliveryProductTotal,getAllSoldProduct,getAvailableAllProducts,buyProduct,getAllSoldProducts,getAllTotal,getAllUserDeliveryProducts,getAllUserProducts,confirmSoldProduct} = require("../services/product/product")




const createAProduct = asyncHandler(async(req,res)=>{
   // user_id,product_track,amount,product_image,
   
    
    const {product_name,product_description,amount,product_image} = req.body;
    try{

        const transaction = await createProduct(req.user.id,product_name,product_description,amount,product_image);
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



const getAvailableProductTotal = asyncHandler(async(req,res)=>{
   
    try{

        const transactions = await getAllAvailabeProductTotal(req.user.id);
        if(!transactions){
            return res.status(404).json({
                status:false,
                message:"No product total  found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})

//confirm receive product

const confirmReceivedProduct = asyncHandler(async(req,res)=>{
   
   
    try{

        const transactions = await confirmSoldProduct(req.user.id);
        if(!transactions){
            return res.status(404).json({
                status:false,
                message:"No product total  found"
            })
        }
        return res.status(200).json(
            {message:"success"}
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})

//user buy Product

const buyProductByUser = asyncHandler(async(req,res)=>{
    const {product_id} = req.body;
   
    try{

        const transactions = await buyProduct(req.user.id,product_id);
        if(!transactions){
            return res.status(404).json({
                status:false,
                message:"No product total  found"
            })
        }
        return res.status(200).json(
            {message:"success"}
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})

//list a product



const listAproduct = asyncHandler(async(req,res)=>{
    const {product_id} = req.body;
   
    try{

        const transactions = await listProduct(req.user.id,product_id);
        if(!transactions){
            return res.status(404).json({
                status:false,
                message:"No product total  found"
            })
        }
        return res.status(200).json(
            {message:"success"}
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})

//get all available transactions
const getAvailableProducts = asyncHandler(async(req,res)=>{
    
    try{

        const transactions = await getAllAvailableProducts(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No Product found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})


const getAllProductsAvailable = asyncHandler(async(req,res)=>{
    
    try{

        const transactions = await getAvailableAllProducts();
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No Product found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})

//get all unlisted products by user

const getUnlistedProducts = asyncHandler(async(req,res)=>{
    
    try{

        const transactions = await getAllUnlistedProducts(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No Product found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})

//get all sold products by seller
const getsoldProductsAndPaymentReceived = asyncHandler(async(req,res)=>{
    
    try{

        const transactions = await getAllSoldProducts (req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No Product found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})

//get all ondelivery transactions
const getdeliveryProducts = asyncHandler(async(req,res)=>{
    
    try{

        const transactions = await getAllUserDeliveryProducts(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No product found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})


//get all User Products
const getProducts = asyncHandler(async(req,res)=>{
   
    try{

        const transactions = await getAllUserProducts(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No Product Found "
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})



//total for all deliveries

const getTotalDelivery = asyncHandler(async(req,res)=>{
   
    try{

        const transactions = await getAllDeliveryProductTotal(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No Product found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})


//get all Totals 'status" product track"

const getTotalForProductTrack = asyncHandler(async(req,res)=>{
   
    
    try{

        const transactions = await getAllTotal(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No Product found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})


const getAllProductsForBuyer = asyncHandler(async(req,res)=>{
   
    try{

        const transactions = await getAllBuyersProducts(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No Product found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})


const getAllProductsBoughtByBuyer = asyncHandler(async(req,res)=>{
   
    try{

        const transactions = await getAllBuyersBoughtProducts(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No Product found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})


const getAllProductsConfirmedByBuyer = asyncHandler(async(req,res)=>{
   
    try{

        const transactions = await getAllBuyersSoldProducts(req.user.id);
        if(!transactions || transactions.length ==0){
            return res.status(404).json({
                status:false,
                message:"No Product found"
            })
        }
        return res.status(200).json(
            transactions
        );
    }catch(error){
        return res.status(500).json({message:"please try another time"})

    }

    
})


module.exports ={createAProduct,
    buyProductByUser,
    getAllProductsConfirmedByBuyer,
    getAllProductsForBuyer,
    getAllProductsBoughtByBuyer,
    getTotalForProductTrack,
    getTotalDelivery,
    getProducts,
    getdeliveryProducts,
    getsoldProductsAndPaymentReceived,
    getAvailableProducts,
    confirmReceivedProduct,
    getAvailableProductTotal,
    listAproduct,
    getUnlistedProducts,
    getAllProductsAvailable









}