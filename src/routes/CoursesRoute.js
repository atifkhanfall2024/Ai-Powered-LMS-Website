const express = require('express')
const ValidateToekn = require('../middleware/ValidateUser')
const { CreateCourse, GetPublished, UpdateCourse, GetCreateCourse } = require('../controllers/CoursesController')
const Courses = express.Router()


Courses.post('/create/course' , ValidateToekn , CreateCourse )
Courses.get('/getpublished/course' , ValidateToekn , GetPublished )
Courses.post('/update/course' , ValidateToekn , UpdateCourse)
Courses.get('/getcreate/course' , ValidateToekn , GetCreateCourse)


module.exports = Courses