const express = require('express')
const ValidateToekn = require('../middleware/ValidateUser')
const { CreateCourse, GetPublished, UpdateCourse, GetCreateCourse, DeleteCOurse } = require('../controllers/CoursesController')
const upload = require('../middleware/multer')
const Courses = express.Router()


Courses.post('/create/course' , ValidateToekn , CreateCourse )
Courses.get('/getpublished/course'  , GetPublished )
Courses.post('/update/:courseid' , ValidateToekn , upload.single('course_Thumbnails') ,  UpdateCourse)
Courses.get('/getcreator/courses' , ValidateToekn , GetCreateCourse)
Courses.delete('/delete/:courseid' , ValidateToekn , DeleteCOurse)


module.exports = Courses