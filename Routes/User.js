const User = require('../Models/User');
const { verifyTokenAndAuthorazation,verifyTokenAndAdmin } = require('./verifyToken');
const crypto=require('crypto-js')
const route=require('express').Router();


//finding user by id, updating the desired data provided in the body, and  authorisation
route.put("/:id",verifyTokenAndAuthorazation,async(req,res)=>{
    


    try{
        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});
  console.log(req.body);
        res.status(200).json(updateUser)
    }catch(err){
               res.status(500).json(err)
    }
});




//find user by id and deleting. Vafirying the token and admin
route.delete('/admin/:id',verifyTokenAndAdmin,async (req,res)=>{
      try{
        const deleteddata=await User.findByIdAndDelete(req.params.id,{new:true})
        res.json(deleteddata);
      }catch(err){
          res.send("No user find with the provided id");
      }
})
module.exports=route;



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjg1YzFjNjU4ZGJiYTIzNjkwNTEwOSIsImlzT3duZXIiOmZhbHNlLCJpYXQiOjE2OTQwODcyMjQsImV4cCI6MTY5NDM0NjQyNH0.MGsFp0HBuJiae5NkxwFayZ267YGXs9D6uGdwA_OQm74


// 64f85c1c658dbba236905109

//For Arbaz
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyYmF6IiwiaXNPd25lciI6ZmFsc2UsImlhdCI6MTY5NDE2ODY1NH0.6w6ZZ5az4m-ssEkXtA0bYIC2WhfpwjHj9PR7RglVILU


//For owner sohailansari
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvaGFpbGFuc2FyaSIsImlzT3duZXIiOnRydWUsImlhdCI6MTY5NDE2OTMwNn0.S3wJtVdKNEM5n9xezMnABltO6sDlW52G9vCKhyZu8ow