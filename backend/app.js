const express = require('express');
const app = express();
const collection = require('./mogo.js');
const bcrypt = require('bcrypt');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const JWT_SECRET = 'dinu';



app.use(express.json()); app.use(cookieParser());app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true // 👈 allow cookies (important for JWT in cookies)
}));

// Login and now send a jwt token :
app.post("/", async(req,res) => {
    const{email,password} = req.body;

    try{
        const check = await collection.findOne({email:email});
        
        if (!check) {
            return res.status(404).send("User not found");
        }
        const doubleCheck = await bcrypt.compare(password, check.password); 
        if(!doubleCheck) return res.status(401).json({message: 'Invalid email or password'});
        const token = jwt.sign({email: check.email}, JWT_SECRET, {expiresIn: '1h'});
        console.log(token);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 36000000
        })
        res.json("exist");
    }   
    catch(e){
        console.log(e);
    }
})

app.post("/signup", async(req,res) => {
    const{email,password} = req.body;

    try{
        const check = await collection.findOne({email:email});

        if(check){
            res.json("exist");
        }
        else{
            res.json("not_exist");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const data = {
                email: email,
                password : hashedPassword
            }
            await collection.insertMany([data]);
        }
    }   
    catch(e){
        console.log(e);
    }
})


function authMiddleware(req, res, next){
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message: "Unauthorized"});


    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next;
    }
    catch(err){
        return res.status(401).json({message: `Invalid token`});
    }
}
// A simple middleware to check if a user is authenticated via sessions
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

// API endpoint for retrieving session data
app.get("/api/profile", isAuthenticated, (req, res) => {
  // Assuming you've saved the user's name (or other details) during login
  const { userId, name } = req.session;
  res.json({ userId, name });
});

app.get('/profile', authMiddleware, (req, res)=> {
    res.json({message : `Welcome ${req.user.email}`});
    console.log(`Welcome ${req.user.email}`);
});


app.post('/logout', (req,res)=>{
    res.clearCookie('token');
    res.json({message: `Logged out niggaChan`});
    console.log(res);
})


app.listen(8080, ()=>{
    console.log("server is running");
})
