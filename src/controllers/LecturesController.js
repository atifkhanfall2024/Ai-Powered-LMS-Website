// create Lecture controller

const UploadCloudinary = require("../Config/cloudinary")
const CourseModel = require("../model/CourseModel")
const VedioModel = require("../model/LectureModel")

const CreateLectures = async(req,res)=>{
    try{

        const {title} = req.body
        const {courseid} = req.params

        // now we will check if this id is present or not 
    
        const course = await CourseModel.findById(courseid)
        if(!course){
            return res.status(401).json({message:'Courseid is incorrect'})
        }

        const Lecture = await VedioModel.create({title})

        
            course.Lectures.push(Lecture._id)
        

      
       //console.log(course);
        await course.save()
    const populatedCourse = await CourseModel.findById(courseid).populate("Lectures");

    return res.status(200).json({
      message: "Lecture created successfully",
      Lecture,
      course: populatedCourse,
    });


    }catch(err){
  return res.status(401).json({message:err.message})
    }
}


// now working of get these lectures

const GetLectures = async(req,res)=>{
    try{

          const {courseid} = req.params

        // now we will check if this id is present or not 
    
           const course = await CourseModel.findById(courseid).populate("Lectures");
           console.log(course.Lectures);
        if(!course){
            return res.status(401).json({message:'Courseid is incorrect'})
        }
     
          return  res.status(200).send( course)
    }catch(err){
  return res.status(401).json({message:err.message})
    }
}


// also update lectures

const UpdateLecture = async(req,res)=>{
    try{

        const {isFree , title} = req.body
        const {lectureid} = req.params

        // first check the id
        const LectureId = await VedioModel.findById(lectureid)
        if(!LectureId)
{
return res.status(401).json({message:'Courseid is incorrect'})
}

      let VedioUrl 
      if(req.file){
        VedioUrl = await UploadCloudinary(req.file.path)
        LectureId.VedioUrl = VedioUrl
      }     

      if(title){
        LectureId.title = title
      }

      LectureId.isFree = isFree

      await LectureId.save()

      return res.status(200).send(LectureId)
      
    }catch(err){
    return res.status(401).json({message:err.message})
    }
}


// also remove lecture

const Remove = async(req,res)=>{
    try{

         const {lectureid} = req.params

         const LectureId = await VedioModel.findByIdAndDelete(lectureid)
                 if(!LectureId)
{
return res.status(401).json({message:'Lecture is not found'})
}


     await CourseModel.updateOne(
        {Lectures:lectureid},
        {$pull:{Lectures:lectureid}}
     )

   return res.status(200).send("Remove Lecture Success")


    }catch(err){
          return res.status(401).json({message:err.message})
    }
}




module.exports = {CreateLectures , GetLectures , UpdateLecture , Remove}