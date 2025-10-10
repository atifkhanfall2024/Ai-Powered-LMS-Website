const express = require('express')
const app = express()
require('dotenv').config()
const ConnectDb = require('./Config/Connection')
const Auth = require('./routes/AuthRoutes')
const { connect } = require('mongoose')
const cookieparser = require('cookie-parser')
const Cors = require('cors')
const GetUsers = require('./routes/GetUser')
const session = require("express-session");
const Profile = require('./routes/ProfileRoute')
const Courses = require('./routes/CoursesRoute')


app.use(Cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true                 
}));
app.use(session({
  secret: process.env.Session_key, 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 } 
}));
app.use(cookieparser())
app.use(express.json())
app.use("/" , Auth)
app.use("/"  , GetUsers)
app.use("/" , Profile)
app.use("/" ,Courses )




ConnectDb().then(()=>{
    console.log('Connection is Success');
    app.listen(process.env.Port_Number || 3000 , ()=>{
    console.log("Server is Listening");
})
}).catch((err)=>{
    console.log('Connection Is not Eastablished Success' , err.message);
})