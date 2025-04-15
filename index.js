require('dotenv').config();
const express = require('express');
require('./config');
const cors = require('cors');
const user=require('./users');
const joinedUser= require('./joinedUser')


const app=express();
app.use(cors());
app.use(express.json());


app.get("/", async (req, res) => {
    res.send("connectMe - Backend project Working Fine");
});
//  Api for users
app.post("/api/newuser",async (req,res)=>{
    let data=new user(req.body)
    let result= await data.save()
    console.log(req.body);    
    res.send(req.body)
})

app.get("/api/userList",async (req,res)=>{
    let data= await user.find();
    res.send(data);
})

app.post("/api/newJoinedUser",async (req,res)=>{
    let data=new joinedUser(req.body)
    let result= await data.save()
    console.log(req.body);    
    res.send(req.body)
})

app.get("/api/joinedUserList",async (req,res)=>{
    let data= await joinedUser.find();
    res.send(data);
})

app.get("/api/joinedUserList/:interest", async (req, res) => {
    const { interest } = req.params;

    try {
        let data = await joinedUser.findOne({ interest:interest });
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({ message: " matching User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});


app.delete("/api/deleteJoinedUserByRoom/:roomID", async (req, res) => {
    const { roomID } = req.params;
  
    try {
      const result = await joinedUser.deleteOne({ roomID });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "User with this roomID not found." });
      }
  
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ message: "Server error while deleting user." });
    }
  });
app.get("/api/userList/:email/:password", async (req, res) => {
    const { email, password } = req.params;

    try {
        let data = await user.findOne({ email: email, password: password });
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});



app.listen(5000);


