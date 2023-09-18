const route=require('express').Router();
const User = require('../Models/User');
const jtk=require('jsonwebtoken');
const crypto=require('crypto-js');


//Creating new user
route.post('/register',async (req,res)=>{
    const newUer=new User({
        username:req.body.username,
        email:req.body.email,
        password:crypto.AES.encrypt(req.body.password,process.env.secretMSG).toString()
    });

    
    try{
        const savedUser=await newUer.save();
        res.status(201).json(savedUser);
        
        //Generating token by convertinf the username and isOwner into a token
        const token=jtk.sign({
          username:savedUser._id,
          isOwner:savedUser.isOwner
        },process.env.json_set)
        console.log("Token for newly user is ",token)
      }catch(err){
        console.log("Sorry not save")
        res.status(500).json(err);
      }

   
   
    
 
     
      
    
    


});


//fetching all the users
route.get('/',async(req,res)=>{
  
   const data=await User.find().sort({ createdAt: 1 }); //in ascending order
   res.json(data);
})


//login using username and password
route.post('/login',async (req,res)=>{
    try{

       const user=await User.findOne({username:req.body.username});
      //  !user && res.status(401).send("Wrond credential");
      //  if(user==null)
      //  {
      //     res.status(401).send("Wrond credential");
      //  }
      console.log(user)
      console.log(req.body.username)
       const hashpasswor=crypto.AES.decrypt(user.password,process.env.secretMSG);

       const password=hashpasswor.toString(crypto.enc.Utf8)

       
       if( password!=req.body.password)
       {
        res.status(401).send("Wrong Password");
        console.log("Wrong passeord")
        return;
       }
       else
       {
         res.json(user)
         console.log("Passwor  is write")
       }

      //generating token
      const accesstoken=jtk.sign({
        id:user._id,
        isOwner:user.isOwner

      },
      process.env.json_set,
      {expiresIn:"3d"}
      );
      console.log("The new accesstoken is "+accesstoken);

    }catch(err){
      res.status(401).json(err);
      console.log(err)
    }
    
})



//handeling all the rest request
route.get("*",(req,res)=>{
    res.send("Page not fount");
})


module.exports=route;