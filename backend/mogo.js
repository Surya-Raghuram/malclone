const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/database").then(() =>{
    console.log("mongodb is connected");
}).catch((e)=>{
    console.log("mongodb is not connected!! \n error is" + e);
})


const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    animeList: [{
        mal_id: Number,
        title: String,
        status: String
    }]
})

const collection = mongoose.model("collection", newSchema);

module.exports = collection;