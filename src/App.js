const express = require('express')
const app = express()
require('dotenv').config()
const Auth = require('./routes/AuthRoutes')

app.use(express.json())
app.use("/" , Auth)

app.listen(process.env.Port_Number || 3000 , ()=>{
    console.log("Server is Listening");
})