const express = require("express")

const router = express.Router();

const {login,register,lookup} = require("../controllers/UserController")
const {validateToken} = require("../middleware/handleJwtTokens")

router.post("/register",register)


router.post("/login",login);

router.get("/lookup",lookup)






module.exports = router;