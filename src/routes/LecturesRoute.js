const express = require('express')
const ValidateToekn = require('../middleware/ValidateUser')
const { CreateLectures, GetLectures } = require('../controllers/LecturesController')

const Lecture = express.Router()


Lecture.post('/create/lecture/:courseid' , ValidateToekn , CreateLectures)
Lecture.get('/get/lecture/:courseid' , ValidateToekn , GetLectures)


module.exports = Lecture