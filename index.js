require('dotenv').config();
const express = require('express');
require('./config');
const cors = require('cors');
const user=require('./users');


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


