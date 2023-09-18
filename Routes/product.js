const route=require('express').Router();
// const productSchema=require('../Models/Product');

const productSchema=require('../Models/Product')
//saving the products on the database
route.post('/add',async(req,res)=>{
    const product=new productSchema(req.body);
    try{
        const addedproduct=await product.save();
        res.json(addedproduct);
    }catch(err){
        res.json(err);
    }


})




//getting all product from the data
route.get("/allproduct",async(req,res)=>{
       try {
             const allpro=await productSchema.find();
             res.status(200).json(allpro)
       } catch (error) {
            res.status(400).json(error);
       }
    // res.send("In all Products")
})

//finding a product by id
route.get('/:id',async(req,res)=>{
    try{
         const userr= await productSchema.findById(req.params.id);
         res.status(200).json(userr)
    }catch(err){
        res.status(400).json(err);
    }
})

route.get('*',(req,res)=>{
    res.send("Not matching any url");
})


module.exports=route;