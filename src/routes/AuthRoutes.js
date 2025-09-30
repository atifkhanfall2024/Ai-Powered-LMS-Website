const express = require('express')
const Auth = express.Router()
const {Signup , Login} = require('../controllers/AuthController')


Auth.post('/signup' , Signup)
Auth.post('/login' ,  Login)



module.exports = Auth