const express = require('express')
const Auth = express.Router()
const {Signup , Login, Logout,  OTPVerify, VerifyOtp, NewPassword} = require('../controllers/AuthController')
const ValidateToekn = require('../middleware/ValidateUser')

Auth.post('/signup' , Signup)
Auth.post('/login' , Login)
Auth.post('/send/otp' , OTPVerify)
Auth.post('/verify/otp' , VerifyOtp)
Auth.post('/changepassward' , NewPassword)
Auth.post('/logout' , ValidateToekn , Logout)



module.exports = Auth