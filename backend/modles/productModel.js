const mongoose=require('mongoose')

const productSchma=new mongoose.Schema({
name:{
    type:String,
    required:[true,"please enter the name"],
    trim:true,
    maxLength:[100,"product name cannot exeed 100 character"]

},
price:{
    type:Number,
    default:0.0
},
description:{
    type:String,
    required:[true,"please enter the description"]
},
ratings:{
    type:String,
    default:0
},
images:[{
    image:{
        type:String,
        required:[true,"plaese enter the filename"]
    }}],
    category:{
        type:String,
        required:[true,"please enter the cetegory"],
        enum:{
            values:[
                "Electronics",
                "Mobile Phones",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
                
            ],
            messsage:"please enter the correct category"
            
        
            
        
    }},
    seller:{
        type:String,
        required:[true,"plese enter the seller detailes"]
    },stock:{
        type:Number,
        required:[true,"plese enter the product stock"],
        maxLength:[20,"max stock only 20"]

    },numOfReviews:{
        type:Number,
        default:0
    },review:[{
        name:mongoose.Schema.Types.ObjectId,
        rating:{
            type:String,
            required:true
        },comment:{
            type:String,
            required:true
        }
    }],cratedAt:{
        type:Date,
        default:Date.now()
    }

})

const productModel=mongoose.model('product',productSchma)

module.exports=productModel