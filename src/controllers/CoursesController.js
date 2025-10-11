const UploadCloudinary = require("../Config/cloudinary")
const CourseModel = require("../model/CourseModel")

const CreateCourse = async(req,res)=>{

    try{

        // here first of all i accept title category from body

        const {course_title , course_Category } = req.body

         const Course_create = await CourseModel.create({
             course_title ,
             course_Category,
             Creator : req.user._id
         })
   
          return res.status(201).json(Course_create)

    }catch(err){
           return res.status(500).json(err.message)
    }
} 


// also check if course is published or not

const GetPublished = async(req,res)=>{

try{
        const Courses = await CourseModel.find({isPublished:true})
    if(!Courses){
        return res.status(401).json('NO any course is Found till now ')
    }
    
    return res.status(200).json(Courses)
}catch(err){
    return res.status(500).json(err.message)
}

}

// get creator courses

const GetCreateCourse = async(req,res)=>{

try{
        const Courses = await CourseModel.find({Creator:req.user._id})
    if(!Courses){
        return res.status(401).json('NO any course is Found till now ')
    }
    
    return res.status(200).json(Courses)
}catch(err){
    return res.status(500).json(err.message)
}

}


// work on updatecourse

const UpdateCourse = async(req,res)=>{

try{
        const {courseid} = req.params
    const {course_title , course_Category , course_subTitle , course_price ,course_level , isPublished , descriptions  } = req.body

    let course_Thumbnails

    if(req.file){
         course_Thumbnails = await UploadCloudinary(req.file.path)
    }

    if(!courseid){
        return res.status(401).json('Id Not Found')
    }

    // also find this id is present or not in db

    const Course_id = await CourseModel.findById(courseid)

    if(!Course_id){
 return res.status(401).json('NO any course is Found till now ')
    }

    // now we update the above data
     
    const updatee = {course_level , course_Category , course_price , course_subTitle , course_title , descriptions , isPublished , course_Thumbnails}

    const Update_data = await CourseModel.findByIdAndUpdate(courseid , updatee , {new:true})

    return res.status(200).json(Update_data)
}catch(err){
    return res.status(501).json(err.message)
}


}


// also work ondelete 

const GetCoursebyid = async(req,res)=>{
    try{

     const {courseid} = req.params
   const Course = await CourseModel.findById(courseid)

    if(!Course){
 return res.status(401).json('NO any course is Found till now ')
    }

     return res.status(200).json(Course)

    }catch(err){
        return res.status(501).json(err.message)
    }
}

const DeleteCOurse =  async(req,res)=>{
    try{

        const {courseid} = req.params

        const Course_id = await CourseModel.findById(courseid)

    if(!Course_id){
 return res.status(401).json('NO any course is Found till now ')
    }

     await CourseModel.findByIdAndDelete(courseid , {new:true})

     return res.status(200).json('Data Delete Success')

    }catch(err){ return res.status(501).json(err.message)}
}


module.exports = {CreateCourse  , GetPublished , GetCreateCourse , UpdateCourse , GetCoursebyid , DeleteCOurse}
