const jwt=require("jsonwebtoken")
const userModel=require("../modles/userModel")
exports.authendicate=async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return res.send("go to login or register first")
    }
   const decode= jwt.verify(token,process.env.JWT_SECRETKEY)
   req.user=await userModel.findById(decode.id)
   console.log(req.user)
   next()


}

exports.authorizeRoles=(...roles)=>{
return (req,res,next)=>{
    console.log(">>>",req.user.role)
    
    if(!roles.includes(req.user.role)){
        return res.status(500).json({
            success:false,
            message:"you are not admin"
        })
    }
    next()
}

}

