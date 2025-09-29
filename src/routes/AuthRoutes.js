const express = require('express')
const Auth = express.Router()
const {Signup} = require('../controllers/AuthController')


Auth.get('/signup' , Signup )



module.exports = Auth