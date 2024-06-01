const express = require("express")

const router = express.Router();

const {getAllProductsBoughtByBuyer,getAllProductsConfirmedByBuyer,confirmReceivedProduct,getAllProductsForBuyer,getAvailableProductTotal,getAvailableProducts,getProducts,buyProductByUser,createAProduct,getTotalDelivery,getTotalForProductTrack,getdeliveryProducts,getsoldProductsAndPaymentReceived,listAproduct,getUnlistedProducts} = require("../controllers/ProductController")
const {validateToken} = require("../middleware/handleJwtTokens")

router.post("/create",validateToken,createAProduct)
router.post("/listProduct",validateToken,listAproduct)
router.get("/userProducts",validateToken,getProducts)
router.post("/buyProduct",validateToken,buyProductByUser)
router.get("/userAvailableProducts",validateToken,getAvailableProducts)
router.get("/allTotalProducts",validateToken,getTotalForProductTrack)
router.get("/allAvailableTotalProducts",validateToken,getAvailableProductTotal)
router.get("/allConfirmedProducts",validateToken,getAllProductsConfirmedByBuyer)
router.get("/alldeliverTotalProducts",validateToken,getTotalDelivery)
router.get("/userUnlistedProducts",validateToken,getUnlistedProducts)
router.get("/buyerproducts",validateToken,getAllProductsForBuyer)
router.post("/confirmReceivedProducts",validateToken,confirmReceivedProduct)
router.get("/deliveryProducts",validateToken,getdeliveryProducts)
router.get("/paidProducts",validateToken,getsoldProductsAndPaymentReceived)
router.get("/buyerboughtproducts",validateToken,getAllProductsBoughtByBuyer)










module.exports = router;