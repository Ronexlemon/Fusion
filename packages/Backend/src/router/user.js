const express = require("express")

const router = express.Router();

const {login,register,lookup,lookupPhoneNumber} = require("../controllers/UserController")
const {validateToken} = require("../middleware/handleJwtTokens")

router.post("/register",register)


router.post("/login",login);

router.get("/lookup",lookup)
router.get("/lookupphone",lookupPhoneNumber)






module.exports = router;