const app=require('./app')
const dotenv=require('dotenv')
const path=require('path')
const dbconnection=require('./config/database')

dotenv.config({path:path.join(__dirname,"config/config.env")})

dbconnection()
app.listen(process.env.PORT,()=>{
    console.log(`app listening at port ${process.env.PORT} and ${process.env.NODE_ENV}`)
})