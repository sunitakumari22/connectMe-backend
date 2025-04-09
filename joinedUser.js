const mongoose= require('mongoose');
 const joinedUserSchema=new mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
    password:String,
 });
module.exports=mongoose.model('joinedUser',joinedUserSchema);