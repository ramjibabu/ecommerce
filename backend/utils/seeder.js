const productModel=require("../modles/productModel")
const data=require("../data/data.json")
const dataBase=require("../config/database")
dataBase()

const seeder=async(req,res, next)=>{
    await productModel.deleteMany()
    console.log("product deleted successfully")
    await productModel.insertMany(data)
    console.log("product added successfully")
    process.exit()


}

seeder()