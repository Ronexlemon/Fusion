const express = require("express")

const router = express.Router();

const {getAllProductsBoughtByBuyer,getAllProductsConfirmedByBuyer,confirmReceivedProduct,getAllProductsForBuyer,getAvailableProductTotal,getAvailableProducts,getProducts,buyProductByUser,createAProduct,getTotalDelivery,getTotalForProductTrack,getdeliveryProducts,getsoldProductsAndPaymentReceived} = require("../controllers/ProductController")
const {validateToken} = require("../middleware/handleJwtTokens")

router.post("/create",validateToken,createAProduct)
router.get("/userProduts",validateToken,getProducts)
router.post("/buyProduct",validateToken,buyProductByUser)
router.get("/userAvailableProducts",validateToken,getAvailableProducts)
router.get("/buyerBoughtproducts",validateToken,getAllProductsForBuyer)










module.exports = router;