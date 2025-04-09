const express=require("express")
const { createNewOrder,
     getSingleOrder ,
     getLogedUserOrder,
      getAllOrders, 
      updateOrder,
      deleteOrder} = require("../controllers/orderController")
const { authendicate, authorizeRoles } = require("../midilewares/authandication")
const router=express.Router()

router.route('/createNewOrder').post(authendicate,createNewOrder)
router.route('/getSingleOrder/:id').get(authendicate,getSingleOrder)
router.route('/getLogedUserOrder').get(authendicate,getLogedUserOrder)

// admin
router.route('/getAllOrders').get(authendicate,authorizeRoles('admin'),getAllOrders)
router.route('/updateOrder/:id').put(authendicate,authorizeRoles('admin'),updateOrder)

router.route('/deleteOrder/:id').delete(authendicate,authorizeRoles('admin'),deleteOrder)

module.exports=router
