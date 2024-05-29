const Transaction = require('../../models/Transaction')


//add transaction


const createTransaction = async(user_id,transactionType,amount,month)=>{

    const transaction = new Transaction({
        user:user_id,
        amount:amount,
        month:month,
        transactionType:transactionType,
    })
    return transaction;

}

//get all trnsactions
const getAllTransactions =async(user_id)=>{
    const transactions =  await Transaction.find({user:user_id})
    return transactions;
}

//get total amount of transaction

const getAllFriendsTransaction = async(user_id)=>{
    const transactions = await Transaction.find({user:user_id,transactionType:"friends"})
    return transactions}


 const getAllUtilityTransaction = async(user_id)=>{
        const transactions = await Transaction.find({transactionType:"utility"})
        return transactions}

const getAllTransfersTransaction = async(user_id)=>{
    const transactions = await Transaction.find({user:user_id,transactionType:"transfers"})
    return transactions}

const getAllUtilityTotalTransaction = async (user_id) => {
    const utilityTransactions = await Transaction.find({user:user_id, transactionType: "utility" });
    
    // Calculate total amount for utility transactions
    const totalAmount = utilityTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    
    return totalAmount;
}

const getAllFriendsTotalTransaction = async (user_id) => {
    const utilityTransactions = await Transaction.find({user:user_id, transactionType: "friends" });
    
    // Calculate total amount for utility transactions
    const totalAmount = utilityTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    
    return totalAmount;
}
const getAllTransfersTotalTransaction = async (user_id) => {
    const utilityTransactions = await Transaction.find({ user:user_id,transactionType: "transfers" });
    
    // Calculate total amount for utility transactions
    const totalAmount = utilityTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    
    return totalAmount;
}

const getAllTotal = async (user_id) => {
    const transactions = await Transaction.find({user:user_id});
    
    // Object to store total amounts for each enum value
    const totalAmounts = {
        utility: 0,
        friends: 0,
        transfers: 0
    };
    
    // Calculate total amount for each enum value
    transactions.forEach(transaction => {
        totalAmounts[transaction.transactionType] += parseFloat(transaction.amount);
    });

    return totalAmounts;
}

const getAllMonthTotal = async (user_id,month) => {
    const transactions = await Transaction.find({user:user_id,month:month});
    
    // Object to store total amounts for each enum value
    const totalAmounts = {
        utility: 0,
        friends: 0,
        transfers: 0
    };
    
    // Calculate total amount for each enum value
    transactions.forEach(transaction => {
        totalAmounts[transaction.transactionType] += parseFloat(transaction.amount);
    });

    return totalAmounts;
}

module.exports = {
    createTransaction,
    getAllTransactions,
    getAllFriendsTransaction,
    getAllUtilityTransaction,
    getAllTransfersTransaction,
    getAllTotal,
    getAllFriendsTotalTransaction,
    getAllTransfersTotalTransaction,
    getAllUtilityTotalTransaction,
    getAllMonthTotal
}