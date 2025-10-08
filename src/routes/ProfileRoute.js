const express = require('express')
const ValidateToekn = require('../middleware/ValidateUser')
const EditProfile = require('../controllers/ProfileController')
const upload = require('../middleware/multer')
const Profile = express.Router()


Profile.post('/edit/profile' , ValidateToekn , upload.single("photoUrl") , EditProfile )



module.exports = Profile