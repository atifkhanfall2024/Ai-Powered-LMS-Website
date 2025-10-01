const express = require('express')
const Auth = express.Router()
const {Signup , Login, Logout} = require('../controllers/AuthController')
const ValidateToekn = require('../middleware/ValidateUser')

Auth.post('/signup' , Signup)
Auth.post('/login' , Login)
Auth.post('/logout' , ValidateToekn , Logout)



module.exports = Auth