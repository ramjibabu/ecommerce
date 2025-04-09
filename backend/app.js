const express=require('express')
const app=express()
const productRoute=require('./routes/productRoute')
const userRoute=require('./routes/userRoute')
const orderRoute=require("./routes/orderRoute")
const cookieParser=require("cookie-parser")
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1",productRoute)
app.use("/api/v1",userRoute)
app.use("/api/v1",orderRoute)



module.exports=app