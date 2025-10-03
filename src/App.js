const express = require('express')
const app = express()
require('dotenv').config()
const ConnectDb = require('./Config/Connection')
const Auth = require('./routes/AuthRoutes')
const { connect } = require('mongoose')
const cookieparser = require('cookie-parser')
const Cors = require('cors')
const GetUsers = require('./routes/GetUser')

app.use(Cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true                 
}));
app.use(cookieparser())
app.use(express.json())
app.use("/" , Auth)
app.use("/"  , GetUsers)




ConnectDb().then(()=>{
    console.log('Connection is Success');
    app.listen(process.env.Port_Number || 3000 , ()=>{
    console.log("Server is Listening");
})
}).catch((err)=>{
    console.log('Connection Is not Eastablished Success' , err.message);
})