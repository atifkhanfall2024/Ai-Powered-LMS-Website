const express = require('express')
const ValidateToekn = require('../middleware/ValidateUser')
const { CreateLectures, GetLectures, UpdateLecture, Remove } = require('../controllers/LecturesController')
const upload = require('../middleware/multer')

const Lecture = express.Router()


Lecture.post('/create/lecture/:courseid' , ValidateToekn , CreateLectures)
Lecture.get('/get/lecture/:courseid' , ValidateToekn , GetLectures)
Lecture.post('/edit/lecture/:lectureid' ,upload.single('VedioUrl') ,  ValidateToekn , UpdateLecture)
Lecture.delete('/remove/:lectureid' , ValidateToekn , Remove)

module.exports = Lecture