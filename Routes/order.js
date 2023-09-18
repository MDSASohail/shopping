const route=require('express').Router();
const orderSchema=require('../Models/Order');
const {verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorazation}=require('./verifyToken')

//Adding an order
route.post('/',verifyTokenAndAuthorazation,async(req,res)=>{
    try{
         const product=new orderSchema(req.body);
         const savedproduct=await product.save();
         res.status(200).json(savedproduct);
    }catch(err){
        res.status(400).json(err);
        console.log("Error");
    }
})


//Updating the order
route.put('/',verifyTokenAndAuthorazation,async(req,res)=>{
    try{
        const updatedOrder=await orderSchema.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true})
    }catch(err){
        res.status(400).json(err);
    }
})

//deleting the order by only admin
route.delete('/',verifyTokenAndAdmin,async(req,res)=>{
    try{
         const order=await orderSchema.FindByIdAndDelete(req.params.id);
         res.status(200).json("Order has been delete successfully");
    }catch(err){
        res.status(400).json(err);
    }
})


//getting all the orders detail of a particular user
route.get('/:userId',verifyTokenAndAuthorazation,async(req,res)=>{
    try{
         const allOrders=await orderSchema.find({userId:req.params.userId});
         res.status(200).json(allOrders);
    }catch(err){
        res.status(400).json(err);
    }
})


//getting all the orders by admin
route.get('/all',verifyTokenAndAdmin,async(req,res)=>{
    try{
         const allOrder=orderSchema.find();
         res.status(200).json(allOrder);
    }catch(err){
        res.status(400).json(err);
    }
})
module.exports=route;