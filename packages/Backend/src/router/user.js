const express = require("express")

const router = express.Router();

const {login,register} = require("../controllers/authentication/authcontroller")
const {validateToken} = require("../middleWare/handleJwtToken")

router.post("/register",register)


router.post("/login",login);

router.get("/logout",)






module.exports = router;