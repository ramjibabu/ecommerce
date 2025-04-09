const express=require("express")
const { 
    registerUser, 
    loginUser, 
    resetPassword, 
    forgotPasswordLink, 
    logOutUser,
    getProfiledetailes,
    changePasswordApi,
    userProfileUpdate,
    getAllUser,
    getPerticulerUser,
    updateUserDate,
    deleteUser
 } = require("../controllers/userController")
const { authendicate, authorizeRoles } = require("../midilewares/authandication")
const router=express.Router()

router.route('/registerUser').post(registerUser)
router.route('/loginUser').post(loginUser)
router.route('/resetPassword').post(resetPassword)
router.route('/forgotPasswordLink/:token').post(forgotPasswordLink)
router.route('/logOutUser').get(logOutUser)

router.route('/getProfiledetailes').get(authendicate,getProfiledetailes)
router.route('/changePasswordApi').post(authendicate,changePasswordApi)
router.route('/userProfileUpdate').put(authendicate,userProfileUpdate)

// admin routes
router.route('/getAllUser').get(authendicate,authorizeRoles('admin'),getAllUser)
router.route('/getPerticulerUser/:id').get(authendicate,authorizeRoles('admin'),getPerticulerUser)
router.route('/updateUserDate/:id').put(authendicate,authorizeRoles('admin'),updateUserDate)
router.route('/deleteUser/:id').delete(authendicate,authorizeRoles('admin'),deleteUser)


module.exports=router