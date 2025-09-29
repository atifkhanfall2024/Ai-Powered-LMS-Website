const express = require('express')
const Auth = express.Router()
const {Signup} = require('../controllers/AuthController')


Auth.post('/signup' , Signup )



module.exports = Auth