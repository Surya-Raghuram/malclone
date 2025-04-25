const express = require('express');
const app = express();
const collection = require('./mogo.js');
const bcrypt = require('bcrypt');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const JWT_SECRET = 'dinu';
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
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
            httpOnly: true, // Cookie is inaccessible to JavaScript (for security)
            secure: false,  // Use `true` in production with HTTPS
            sameSite: 'Lax', // Prevent cross-site request forgery
            maxAge: 3600000  // Expiry time in milliseconds (1 hour)
        });
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

function authMiddleware(req, res, next){
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

app.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: `Welcome ${req.user.email}` });
});

app.post('/logout', (req,res)=>{
    res.clearCookie('token');
    res.json({message: `Logged out niggaChan`});
    console.log(res);
})


app.listen(8080, ()=>{
    console.log("server is running");
})
