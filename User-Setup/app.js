const express = require('express');
const app = express();
const collection = require('./mogo.js');
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get("/", cors(), (req, res) => {

})

app.post("/", async(req,res) => {
    const{email,password} = req.body;

    try{
        const check = await collection.findOne({email:email});

        if(check){
            res.json("exist");
        }
        else{
            res.json("not_exist");
        }
    }   
    catch(e){
        console.log(e);
    }
})

app.post("/signup", async(req,res) => {
    const{email,password} = req.body;

    const data = {
        email: email,
        password : password
    }

    try{
        const check = await collection.findOne({email:email});

        if(check){
            res.json("exist");
        }
        else{
            res.json("not exist");
            await collection.insertMany([data]);
        }
    }   
    catch(e){
        console.log(e);
    }
})

app.listen(5173, ()=>{
    console.log("server is running");
})