const { default: mongoose } = require('mongoose');
const mongodb=require('mongoose');
const OrderSchema=mongodb.Schema({
       userId:{type:String,require:true},
       products:[
         {
            productId:{type:String},
            quantity:{type:Number,default:1}
         }
       ],
       amount:{type:Number,require:true},
       address:{type:Object,require:true},
       status:{type:String,default:"Pending"}
},{timestamps:true});


module.exports=mongoose.model("Order",OrderSchema);