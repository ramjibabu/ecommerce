const userModel = require("../modles/userModel")
const sendToken=require("../utils/jwt")
const emailSending = require("../utils/mail")
const crypto=require("crypto")

exports.registerUser=async(req,res,next)=>{
    try{
        const {name,email,password,avatar}=req.body
        const user=await userModel.create({
             name,
             email,
             password,
             avatar
    })
    sendToken(user,201,res)
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
    
}

exports.loginUser=async(req,res,next)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.send("email and password is required")
        }
       const user=await await userModel.findOne({email}).select('+password')
       if(!user){
        return res.send("email or password is wrong")
       }
       if(!await user.verifyPassword(password)){
        return res.send("email or password is wrong")
       }
       sendToken(user,201,res)


    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
}

exports.resetPassword=async(req,res,next)=>{
    const {email}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(400).send("email is wrong")
    }

    const token=user.resetPasswordTokenSetting()
    await user.save({validateBeforeSave:false})

    const url=`${req.protocol}://${req.get('host')}/api/v1/resetPassword/${token}`
    const message=`your reset password url is /n
    ${url}, you are not requested this url just ignore it`
    

    try{
        emailSending({
            toEmail:user.email,
            subject:"mail recovery URL",
            message:message
        })
        res.status(201).json({
            success:true,
            message:"email send successfully"
        })

    }catch(err){
        user.resetPasswordToken=undefined
        user.resetPasswordTokenExpire=undefined
        await user.save({validateBeforeSave:false})
        res.status(400).json({
            success:false,
            message:err.message
        })
    }

}

exports.forgotPasswordLink=async(req, res , next)=>{
    try{

        const {token}=req.params
        const resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex')
        console.log(resetPasswordToken)
        const user=await userModel.findOne({
            resetPasswordToken,
        resetPasswordTokenExpire:{$gt :Date.now()}
    })
        if(!user){
           return res.status(404).send("your resetpassword token error")
        }
        if(!req.body.password || !req.body.confirmPassword){
            return res.status(400).send("password and confirmPassword is required")

        }

        if(req.body.password !== req.body.confirmPassword){
            return res.status(500).send("password and confirm password is not match")
        }

        user.password=req.body.password
        user.resetPasswordToken=undefined
        user.resetPasswordTokenExpire=undefined
        user.save({validateBeforeSave:false})
        sendToken(user,201,res)

    }catch(err){
res.status(500).json({
    success:false,
    message:err.message
})
    }
}

exports.logOutUser=(req ,res , next)=>{
   res.status(200).cookie('token',null,{
    expires:new Date(Date.now()),
    httpOnly:true
   }).json({
    success:true,
    message:"loged Out successFully"
   })
}

// get profile detailes api
exports.getProfiledetailes=async(req, res, next)=>{
    const id=req.user.id
    
    const user=await userModel.findById(id)
    res.status(201).json({
        success:true,
        user
    })
}

// change password api
exports.changePasswordApi=async(req,res,next)=>{
    const user=await userModel.findById(req.user.id).select('+password')
    const oldPassword=req.body.oldPassword
    if(!oldPassword){
        return res.status(400).send("old password is required")
    }
    
    if(!await user.verifyPassword(oldPassword)){
        return res.status(404).send("your old password is wrong plese go to forgot password option")
    }
    if(!req.body.newPassword || !req.body.newConfirmPassword){
        return res.status(500).send("newPassword and newConfirm Password is required")
    }
    if(req.body.newPassword !== req.body.newConfirmPassword){
        return res.status(500).send("newPassword and newConfirm Password are not same")
    }
    user.password=req.body.newPassword
    await user.save({validateBeforeSave:false})
    res.status(201).json({
        success:true,
        message:"password changed successfully"
    })
}

// user profile update
exports.userProfileUpdate=async(req, res, next)=>{
    try{

   
const user=await userModel.findByIdAndUpdate(req.user.id,{
    email:req.body.email,
    name:req.body.name,
   
},{
    new:true,
    runValidators:true,
})
if(!user){
    return res.status(400).send("go to login first")
}
res.status(200).json({
    success:true,
    user
})
}catch(err){
    res.status(500).json({
        success:false,
        message:err.message
    })
}
}

// get all user:Admin
exports.getAllUser=async(req, res, next)=>{
    try{

    
    const user=await userModel.find({role:"user"})
    res.status(201).json({
        success:true,
        count:user.length,
        user
    })
}catch(err){
    res.status(500).json({
        success:false,
        message:err.message
    })
}
}

// getPerticulerUser Api:admin
exports.getPerticulerUser=async(req, res, next)=>{
    try{
const {id}=req.params
    
    const user=await userModel.findById(id)
    if(!user){
        return res.status(404).send("somthing went wrong")
    }
    res.status(201).json({
        success:true,
        count:user.length,
        user
    })
}catch(err){
    res.status(500).json({
        success:false,
        message:err.message
    })
}
}

// updateUserDate Api:Admin
exports.updateUserDate=async(req, res, next)=>{
    try{
const {id}=req.params
    
    const user=await userModel.findByIdAndUpdate(id,
        {
            email:req.body.email,
            name:req.body.name,
            role:req.body.role
        },
        {
            new:true,
            runValidators:true
        }
    )
    if(!user){
        return res.status(404).send("somthing went wrong")
    }
    res.status(201).json({
        success:true,
        
        user
    })
}catch(err){
    res.status(500).json({
        success:false,
        message:err.message
    })
}
}

// deleteUser Api
exports.deleteUser=async(req, res, next)=>{
    try{
const {id}=req.params
    
    const user=await userModel.findByIdAndDelete(id)
    if(!user){
        return res.status(500).send("somthing went wrong")
    }
    res.status(201).json({
        success:true,
        
        message:"user detial is deleted successfully"
    })
}catch(err){
    res.status(500).json({
        success:false,
        message:err.message
    })
}
}

  
  



