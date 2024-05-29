const User = require("../../models/User")



//function to create user


const createUser = async(phoneNumber,Password)=>{
    const data = new User(
        {
            phoneNumber:phoneNumber,
            password:Password
        }
    );
    return data;
}


//function authenticate user

const authenticate = async(phoneNumber)=>{
    const data = await User.findOne({phoneNumber:phoneNumber});
    return data;
}

module.exports = {createUser,authenticate}