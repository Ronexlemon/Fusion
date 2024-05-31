const express = require("express")

const router = express.Router();

const {getAllProductsBoughtByBuyer,getAllProductsConfirmedByBuyer,confirmReceivedProduct,getAllProductsForBuyer,getAvailableProductTotal,getAvailableProducts,getProducts,buyProductByUser,createAProduct,getTotalDelivery,getTotalForProductTrack,getdeliveryProducts,getsoldProductsAndPaymentReceived} = require("../controllers/ProductController")
const {validateToken} = require("../middleware/handleJwtTokens")

router.post("/register",register)


router.post("/login",login);

router.get("/logout",)






module.exports = router;