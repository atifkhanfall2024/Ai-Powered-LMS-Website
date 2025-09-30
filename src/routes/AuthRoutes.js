const express = require('express')
const Auth = express.Router()
const {Signup , Login, Logout} = require('../controllers/AuthController')


Auth.post('/signup' , Signup)
Auth.post('/login' ,  Login)
Auth.post('/logout' ,  Logout)



module.exports = Auth