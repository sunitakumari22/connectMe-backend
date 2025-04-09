const mongoose= require('mongoose');
 const joinedUserSchema=new mongoose.Schema({
    name: String,
    roomID: String,
    interest: String
 });
module.exports=mongoose.model('joinedUser',joinedUserSchema);