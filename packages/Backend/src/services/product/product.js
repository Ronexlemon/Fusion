const Product = require('../../models/Product')


const createProduct = async(user_id,Product_name,Product_description,amount,product_image)=>{

    const transaction = new Product({
        user: user_id,
        amount:amount,       
        product_image: product_image,
        Product_name:Product_name,
        Product_description:Product_description
        // product_no:product_no,
    })
    return transaction;

}

//get all trnsactions
const getAllUserProducts =async(user_id)=>{
    const transactions =  await Product.find({user:user_id})
    return transactions;
}

//get total amount of transaction

const getAllAvailableProducts = async(user_id)=>{
    const transactions = await Product.find({user:user_id, product_track:"available"})
    return transactions}

const getAllUnlistedProducts = async(user_id)=>{
    const transactions = await Product.find({user:user_id, product_track:"unlisted"})
    return transactions}

    


 const getAllUserDeliveryProducts = async(user_id)=>{
        const transactions = await Product.find({user:user_id,product_track:"ondelivery"})
        return transactions}

const getAllSoldProduct = async(user_id)=>{
    const transactions = await Product.find({user:user_id,product_track:"sold"})
    return transactions}

const getAllAvailabeProductTotal = async (user_id) => {
    const utilityTransactions = await Product.find({user:user_id, product_track: "available" });
    
    // Calculate total amount for utility transactions
    const totalAmount = utilityTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    
    return totalAmount;
}

const getAllDeliveryProductTotal = async (user_id) => {
    const utilityTransactions = await Transaction.find({user:user_id, product_track:"ondelivery" });
    
    // Calculate total amount for utility transactions
    const totalAmount = utilityTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    
    return totalAmount;
}
const getAllSoldProducts = async (user_id) => {
    const utilityTransactions = await Transaction.find({ user:user_id,product_track:"sold" });
    
    // Calculate total amount for utility transactions
    const totalAmount = utilityTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    
    return totalAmount;
}

const getAllTotal = async (user_id) => {
    const transactions = await Product.find({user:user_id});
    
    // Object to store total amounts for each enum value
    const totalAmounts = {
        available: 0,
        ondelivery: 0,
        sold: 0
    };
    
    // Calculate total amount for each enum value
    transactions.forEach(transaction => {
        totalAmounts[transaction.transactionType] += parseFloat(transaction.amount);
    });

    return totalAmounts;
}

const buyProduct = async(user_id,product_id)=>{
    const product = await Product.findOneAndUpdate({ _id: product_id },{$set: {buyer: user_id,product_track: 'ondelivery' // or another status based on your logic
            }
        },
        { new: true } // Return the updated document
    );
    return !!product;

   
}

const listProduct = async(user_id,product_id)=>{
    const product = await Product.findOneAndUpdate({ _id: product_id,user:user_id },{$set: {product_track: 'available' // or another status based on your logic
            }
        },
        { new: true } // Return the updated document
    );
    return !!product;

   
}

const getAllBuyersProducts =async(user_id)=>{
    const products = await Product.find({buyer:user_id});

    return products;
}

const getAllBuyersBoughtProducts =async(user_id)=>{
    const products = await Product.find({buyer:user_id,product_track: 'ondelivery'});

    return products;
}


const getAllBuyersSoldProducts =async(user_id)=>{
    const products = await Product.find({buyer:user_id,product_track: 'sold'});

    return products;
}


const confirmSoldProduct = async(user_id)=>{
    const product = await Product.findOneAndUpdate({ buyer: user_id,_id:pro },{$set: {product_track: 'sold' // or another status based on your logic
            }
        },
        { new: true } // Return the updated document
    );
    return !!product;

   
}




module.exports = {
    getAllAvailabeProductTotal,
    getAllBuyersProducts,
    getAllBuyersSoldProducts,
    confirmSoldProduct,
    getAllBuyersBoughtProducts,
    getAllDeliveryProductTotal,
   createProduct,
   buyProduct,
   getAllTotal,
   getAllUserProducts,
   getAllSoldProducts,
   getAllAvailableProducts,
   getAllUserDeliveryProducts,
   getAllSoldProduct,
   listProduct,
   getAllUnlistedProducts,
   


}