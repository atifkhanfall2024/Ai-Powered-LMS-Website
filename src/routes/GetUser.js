const express = require('express')
const ValidateToekn = require('../middleware/ValidateUser')
const GetUsers = express.Router()
const {GetUser} = require('../controllers/GetUserInfo')


GetUsers.get('/getuser' , ValidateToekn , GetUser)



module.exports = GetUsers