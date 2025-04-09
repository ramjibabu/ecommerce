const mongoose=require("mongoose")
const validator=require('validator')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")

const userSchma=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },email:{
        type:String,
        required:[true,"email is required"],
        validate:[validator.isEmail,"validate email is required"],
        unique:true
    },password:{
        type:String,
        required:[true,"password is required"],
        maxLength:[6,"max length is 6"],
        select:false
    
    }
        
,avatar:{
    type:String,
    required:[true,"avatar is required"]
},role:{
    type:String,
    default:"user"
},createdAt:{
    type:Date,
    default:Date.now()
},resetPasswordToken:String,
resetPasswordTokenExpire:Date
   

})

userSchma.pre("save",async function(next){
    if(!this.isModified('password')){
        return next()
    }
this.password =await bcrypt.hash(this.password,10)
})

userSchma.methods.verifyPassword=async function(enterdPassword){
return await bcrypt.compare(enterdPassword,this.password)
}

userSchma.methods.jwtToken=function(){
   return jwt.sign({id:this.id},process.env.JWT_SECRETKEY,{expiresIn:process.env.JWT_EXPIRE})
}

userSchma.methods.resetPasswordTokenSetting=function(){
    const token=crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex')
    this.resetPasswordTokenExpire=Date.now() + 30 * 60 * 1000
    return token

}

const userModel=mongoose.model('user',userSchma)
module.exports=userModel