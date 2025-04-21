import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();
const MONGO_URI = "mongodb://localhost:27017/"


app.use(session({
    secret: "help",
    resave: false, 
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: MONGO_URI}),
    cookie: {
        maxAge : 1000*60*60*24,
        httpOnly: true,
        
    }
}))