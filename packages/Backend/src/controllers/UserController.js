const asyncHandler = require("express-async-handler")

const {createUser,authenticate} = require("../services/auth/user");

const {hashPassword,compareHashPassword} = require("../hooks/hashComparePassword");

const {generateAccessToken,generateRefreshToken} = require("../middleware/handleJwtTokens")


const register = asyncHandler(async(req,res)=>{
    const {phoneNumber,password} = req.body;
    try{
        const hashPass = await hashPassword(password);
        const user = await createUser(phoneNumber,hashPass);
        if(!user || user.length ==0){
         return   res.status(400).json({
                message:"User not created"
            })
        }   

        await user.save();

       return res.status(200).json({
            message:"User created successfully",
            user
        })


    }catch(error){
        console.log(error)

return res.status(500).json({
    message:"Internal server error",
    error
})
    }

})


//loging

const login = asyncHandler(async(req,res)=>{
    const {phoneNumber,password} = req.body;

    try{
        const user = await authenticate(phoneNumber);

        if(!user || user.length ==0){
            return   res.status(400).json({
                message:"confirm your credentials"
            })

        }
        const passMatch = await compareHashPassword(password,user.password);
        console.log("user id",user._id)
       
        if(passMatch){
            const accestoken = await generateAccessToken(user.phoneNumber,user._id)

            const refreshToken = await generateRefreshToken(user.phoneNumber,user._id)
          
          res.cookie("refreshToken",refreshToken,
          {maxAge:24*60*60*1000,
            httpOnly:true,
            secure:false, // o be changed on production to true
            sameSite:"None"});
            res.status(200).json({userdata:user,accesstokens:accestoken});
        }else{
            res.status(400).json("Confirm your credentials");
        };


    }catch(error){
        return res.status(500).json({
            message:"Internal server error",
            error
        })
        
    }
})


module.exports = {register,
    login
}