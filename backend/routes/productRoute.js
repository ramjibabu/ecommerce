const express=require("express")
const { getAllProduct, createProduct, getSingleProduct, updateProduct,deleteProduct,crateReview,getReviews,deleteReviews } = require("../controllers/productController")
const { authendicate, authorizeRoles } = require("../midilewares/authandication")
const router=express.Router()

router.route("/getAllProduct").get(getAllProduct)
router.route('/crateProduct').post(authendicate,authorizeRoles('admin'),createProduct)
router.route('/getSingleProduct/:id').get(getSingleProduct)
router.route('/updateProduct/:id').put(authendicate,authorizeRoles('admin'),updateProduct)
router.route('/deleteProduct/:id').delete(authendicate,authorizeRoles('admin'),deleteProduct)

router.route('/crateReview').put(authendicate,crateReview)
router.route('/getReviews').put(authendicate,getReviews)

router.route('/deleteReviews').delete(authendicate,deleteReviews)
deleteReviews


module.exports=router;