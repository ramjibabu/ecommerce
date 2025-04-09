const orderModel = require("../modles/orderModel")
const productModel=require("../modles/productModel")
exports.createNewOrder=async(req, res, next)=>{

    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo}=req.body
    const order=await orderModel.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt:Date.now(),
            user:req.user.id
    })
    res.status(201).json({
        success:true,
        message:"orderCreated",
        order
    })

}

exports.getSingleOrder=async(req, res , next)=>{
    
   const order=await orderModel.findById(req.params.id).populate('user','name email')
   if(!order){
    return res.status(404).send("can't find this one")
   }
   res.status(201).json({
    success:true,

    order
})
}

// getLogedUser Orders
exports.getLogedUserOrder=async(req, res , next)=>{
    
    const order=await orderModel.find({user:req.user.id})
    if(!order){
     return res.status(404).send("can't find this one")
    }
    res.status(201).json({
     success:true,
 
     order
 })
}

// getAllOrders:admin
exports.getAllOrders=async(req, res , next)=>{
    
    const order=await orderModel.find()
    let totalAmount=0
    order.forEach(order =>{
        totalAmount=totalAmount+order.totalPrice
    })
    if(!order){
     return res.status(404).send("can't find this one")
    }
    
    res.status(201).json({
     success:true,
 
     order,
     totalAmount
 })
}

// update route:admin
exports.updateOrder=async(req, res ,next)=>{
    const order=await orderModel.findById(req.params.id)
    if(order.orderStatus == 'Deliverd'){
        return res.status(400).send("order is already deleverd")
    }
    order.orderItems.forEach(async orderItems =>{
        await updateStock(orderItems.product,orderItems.quantity)
        
    })
    order.orderStatus=req.body.orderStatus
    order.deliverAt=Date.now()
    await order.save()

    res.status(201).json({
        success:true,

    })
    
}

async function updateStock(productId,quantity){
    const product=await productModel.findById(productId)
    product.stock=product.stock - quantity
    await product.save({validateBeforeSave:false})
}

exports.deleteOrder=async(req, res, next)=>{
    const order=await orderModel.findByIdAndDelete(req.body.id)
    if(!order){
        return ers.status(404).send("order is not found")
    }

res.status(201).json({
    success:true
})
}