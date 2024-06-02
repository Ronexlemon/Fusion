const asyncHandler = require("express-async-handler");

const { createUser, authenticate } = require("../services/auth/user");
const { hashPassword, compareHashPassword } = require("../hooks/hashComparePassword");

const { useSocialConnect } = require("../hooks/maphonenumberToAddress");
const { getTheCurrentTime } = require("../hooks/getnowTime");
const {generateAccessToken,generateRefreshToken}=require("../hooks/generateJwtTokens")

// Register User
const register = asyncHandler(async (req, res) => {
    const { mapPhoneNumber } = await useSocialConnect();
    const { phoneNumber, password, userAddress } = req.body;

    try {
        const time = getTheCurrentTime();
        const hashPass = await hashPassword(password);
        const user = await createUser(phoneNumber, hashPass);

        if (!user) {
            return res.status(400).json({ message: "User not created" });
        }

        // Register phone number
        const result = await mapPhoneNumber(phoneNumber, userAddress, time);
        console.log(result)
        
            await user.save();
            return res.status(200).json({
                message: "User created successfully",
                user
           

        })
        

        

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Login User
const login = asyncHandler(async (req, res) => {
    // const { mapPhoneNumber,lookupForAddresses } = await useSocialConnect();
    const { phoneNumber, password } = req.body;

    try {
        const user = await authenticate(phoneNumber);

        if (!user) {
            return res.status(400).json({ message: "Confirm your credentials" });
        }

        const passMatch = await compareHashPassword(password, user.password);
        console.log("User ID:", user._id);

        if (passMatch) {
            const accessToken = await generateAccessToken(user.phoneNumber, user._id);
            const refreshToken = await generateRefreshToken(user.phoneNumber, user._id);

            res.cookie("refreshToken", refreshToken, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false, // Change to true in production
                sameSite: "None"
            });
            // const userAdd = await lookupForAddresses(phoneNumber);

            return res.status(200).json({ userData: user, accessToken});
        } else {
            return res.status(400).json({ message: "Confirm your credentials" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

//lookup address
const lookup = asyncHandler(async (req, res) => {
    const { mapPhoneNumber,lookupForAddresses } = await useSocialConnect();
    const { phoneNumber } = req.body;
   

    try {
       

        // Register phone number
        const userAdd = await lookupForAddresses(phoneNumber);
        
        
            
            return res.status(200).json(userAdd )       
                 

        
        

        

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});


const lookupPhoneNumber = asyncHandler(async (req, res) => {
    const { mapPhoneNumber, lookupForAddresses } = await useSocialConnect();
    const { phoneNumber } = req.query; // Read phoneNumber from query parameters

    try {
        // Lookup user address by phone number
        const userAdd = await lookupForAddresses(phoneNumber);
        
        return res.status(200).json(userAdd);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

const lookupquery = asyncHandler(async (req, res) => {
    const { mapPhoneNumber, lookupForAddresses } = await useSocialConnect();
    const { phoneNumber } = req.query;

    try {
        const userAdd = await lookupForAddresses(phoneNumber);
        return res.status(200).json(userAdd);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

module.exports = { register, login,lookup,lookupPhoneNumber,lookupquery };
