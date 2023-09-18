const route=require('express').Router();

const cartSchma=require('../Models/Cart');
const { verifyTokenAndAuthorazation,verifyTokenAndAdmin,verifyToken } = require('./verifyToken');

//Adding product to the cart
route.post('/',verifyToken,async(req,res)=>{
    const product=new cartSchma(req.body);
     try{
        const uploadedCart= await  product.save();
        console.log(uploadedCart);
        res.send("Added to cart successfylly");
     }catch(err){
        res.status(500).json(err);
     }

})


//updata the cart by id and update

route.put('/:id',verifyTokenAndAuthorazation,async(req,res)=>{
    try{
        const updatedcart=await cartSchma.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});
        res.status(200).json(updatedcart);
    }catch(err){
        res.status(500).json(err);
    }
})


//deleting the item
route.delete('/:id',verifyTokenAndAuthorazation,async(req,res)=>{
    try{
         const pro=await cartSchma.findByIdAndDelete(req.params.id,{new:true});
         res.json(pro);
    }catch(err){
        res.json(err);
    }
})

//geting all the items of a user's cart
route.get("/find:id",verifyTokenAndAuthorazation,async(req,res)=>{
    try{
          const allItem=cartSchma.FindOne({userId:req.params.id});
          res.status(200).json(allItem);
    }catch(err){
        res.status(400).json(err);
    }
})

//get all items, only by Admin
route.get('/',verifyTokenAndAdmin,async(req,res)=>{
    try{
        const allItems=cartSchma.Find();
        res.status(200).json(allItems);
    }catch(err){
        res.json(err);
    }
})

route.get("/add",(req,res)=>{
    res.send("This is in cart");
})

route.get('*',(req,res)=>{
    res.send("Error no matching any url");
})

module.exports=route;