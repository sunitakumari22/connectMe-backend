const mongoose= require('mongoose');
 const userShema=new mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
    password:String,
 });
module.exports=mongoose.model('users',userShema);