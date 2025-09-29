const express = require('express')
const app = express()
require('dotenv').config()

app.get('/' , (req,res)=>{
    res.send('Hello Hello Hello')
})

app.listen(process.env.Port_Number || 3000 , ()=>{
    console.log("Server is Listening");
})