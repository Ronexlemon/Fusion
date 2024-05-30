const express = require("express")

const router = express.Router();

const {login,register} = require("../controllers/UserController")
const {validateToken} = require("../middleware/handleJwtTokens")

router.post("/register",register)


router.post("/login",login);

router.get("/logout",)






module.exports = router;