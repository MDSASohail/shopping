const mongodb=require("mongoose");
const CartShema=mongodb.Schema({
    userId:{type:String,required:true},
    products:[
        {
            productId:{type:String},
            quantity:{type:Number}
        }
    ],
},{timestamps:true});

module.exports=mongodb.model("cart",CartShema);