
const jwt = require("jsonwebtoken")

const generateAccessToken =async(userPhoneNumber,userId)=>{

    const accestoken = jwt.sign({
            user:{
                phoneNumber: userPhoneNumber,
                id: userId
            }
        },process.env.ACCESS_TOKEN_SECERT,{expiresIn:"1d"}) // to change to 15 mins on production

        return accestoken;


}

const generateRefreshToken =async(userPhoneNumber,userId)=>{

    const refreshtoken = jwt.sign({
            user:{
                phoneNumber: userPhoneNumber,
                
                id: userId
            }
        },process.env.ACCESS_TOKEN_SECERT,{expiresIn:"1d"})

        return refreshtoken;


}

module.exports ={
    generateAccessToken,
    generateRefreshToken
}