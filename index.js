const express=require('express');
const app=express();
const path=require('path');
const mongodb=require("mongoose");
const dotenv=require('dotenv');
const crypto=require('crypto-js');
dotenv.config();
const loginAndRegister=require('./Routes/LoginOrCreate');
const updataAndDelete=require('./Routes/User')
const cartRouter=require('./Routes/cart')
const orderRouter=require('./Routes/order');
const productRoute=require('./Routes/product')
mongodb.connect(process.env.mongo_pass).then(()=>{console.log("Successfully connected to the server")}).catch((error)=>{console.log(error)});



app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

app.use(express.urlencoded({extended:true}))
app.use('/pro',productRoute);
app.use('/order',orderRouter);
app.use('/cart',cartRouter);
app.use('/and',updataAndDelete);
app.use('/auth',loginAndRegister);
app.get('/login',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'./Login.html'))
})

app.get('/singhup',(req,res)=>{
    res.sendFile(path.join(__dirname,'./form.html'))
})
app.get("/contact",(req,res)=>{
    res.send("Contact");
})




app.get("/form",(req,res)=>{
    res.sendFile(path.join(__dirname,'./form.html'))
})


app.listen(8000,()=>{
     console.log("Server is running")
})