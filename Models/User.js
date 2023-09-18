const mongodb=require('mongoose');

const UserSchema=new mongodb.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isOwner:{type:Boolean,default:true},

},{timestamps:true});

module.exports=mongodb.model("user",UserSchema);