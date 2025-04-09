const productModel=require("../modles/productModel")
const apiFuters = require("../utils/apiFutures")

exports.getAllProduct=async(req,res,next)=>{
   
    try{ 
        const resultPerPage=2
        const api=new apiFuters(productModel.find(),req.query).search().fillter().pagenate(resultPerPage)
       
        const product=await api.query
        const totalProductCount=await productModel.countDocuments({})
        await new Promise(item=>setTimeout(item, 2000))
        
        res.status(201).json({
            success:true,
            count:totalProductCount,
            resultPerPage,
            product

        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
   
}

exports.createProduct=async(req,res,next)=>{
    try{
        const product=await productModel.create(req.body)
        res.status(201).json({
            success:true,
            
            product

        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
 

}

exports.getSingleProduct=async(req,res,next)=>{
    try{
    const {id}=req.params
    console.log(id)
    const product=await productModel.findById(id)
    console.log(product)
    res.status(201).json({
        success:true,
        
        product

    })
}catch(err){
    res.status(500).json({
        success:false,
        message:err.message
    })
}

}

exports.updateProduct=async(req,res,next)=>{
    try{
        const {id}=req.params
    const body=req.body
    const product=await productModel.findByIdAndUpdate(
        id,
        body,
        {new:true}
    )
    res.status(201).json({
        success:true,
        product
    })
}catch(err){
    res.status(500).json({
        success:false,
message:err.message
    })

}
}

exports.deleteProduct=async(req,res,next)=>{
    
    try{
        const id=req.params.id
        const product=await productModel.findByIdAndDelete(id)
        res.status(201).json({
            success:true,
            message:"product Deleted SuccessFully"
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.messge
        })  
    }
    
}

// review api
exports.crateReview=async(req, res, next)=>{
    const {comment,productId,rating}=req.body

    const review={
        user:req.user.id,
        comment,
        rating
    }
    const product=await productModel.findById(productId)
    const isReviewed=product.reviews.find(review =>
    {
        return review.user.toString()==req.user.id.toString()
    }
    )

    if(isReviewed){
        product.reviews.forEach(review =>{
            if(review.user.toString()==req.user.id.toString()){
                review.rating=rating
                review.comment=comment
            }
        })

    }else{
        product.reviews.push(review)
        product.numOfReviews=product.reviews.length
    }
    product.ratings=product.reviews.reduce((acc, review)=>{
        return review.rating + acc
    },0)/product.reviews.length
    isNAN(product.ratings)?0:product.ratings

    await product.save({validateBeforeSave:false})
    res.status(201).json({
        success:true,
        product
    })

}

// get reviews
exports.getReviews=async(req, res, next)=>{
   const product=await productModel.findById(req.query.productId)
   res.send(201).json({
    success:true,
    reviews:product.reviews
   })
}

//delete review
exports.deleteReviews=async(req, res, next)=>{
    const product=await productModel.findById(req.query.productId)
    const reviews=product.reviews.fillter(review =>{
        return review._id.toString()!==req.query.id.toString()
    })
    const numOfReviews=review.length
    let ratings=reviews.reduce((acc, review)=>{
        return review.rating+acc
    },0)/reviews.length
    ratings=isNAN(ratings)?0:ratings
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        numOfReviews,
        ratings
    })

    res.status(200).json({
        success:true
    })

}
