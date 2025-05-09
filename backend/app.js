const express = require('express');
const app = express();
const collection = require('./mogo.js');
const bcrypt = require('bcrypt');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


//This should be the data to be rendered on the profile page> 
app.get('/post', authenticateToken, async (req, res) => {
  try {
    const posts = await collection.find({ username: req.user.email }).toArray();
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

// Login and now send a jwt token :
app.post("/api/authenticate", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await collection.findOne({ email }).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    console.log(accessToken);
    res.json({ accessToken });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});



// Middleware to authenticate the token>> 
function authenticateToken(req, res, next){
    const authHeader = req.header['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user)=>{
        if(err) return res.sendStatus(401);
        req.user = user;
        next()
    })
}


app.post("/signup", async(req,res) => {
    const{email,password} = req.body;

    try{
        const check = await collection.findOne({email:email});

        if(check){
            res.json("exist");
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const data = {
                email: email,
                password : hashedPassword
            }
            await collection.insertMany([data]);
            res.json("not_exist");
        }
    }   
    catch(e){
        console.log(e);
    }
})





app.post('/logout', (req,res)=>{
    res.json({message: `Logged out niggaChan`});
    console.log(res);
})


app.listen(8080, ()=>{
    console.log("server is running");
})
