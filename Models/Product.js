const mongodb=require('mongoose');

const ProductSchema=mongodb.Schema({
    title:{type:String,required:true},
    cost:{type:Number,required:true},
    des:{type:String,required:true},
    category:{type:Array},
    color:{type:Array},
    img:{type:String,required:true},
    size:{type:Array},
},{timestamps:true});
module.exports=mongodb.model("product",ProductSchema);