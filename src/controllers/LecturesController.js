// create Lecture controller

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
        

       await course.populate("Lectures");
       //console.log(course);
        await course.save()

        res.status(200).send(Lecture , course)


    }catch(err){
  return res.status(401).json({message:err.message})
    }
}


// now working of get these lectures

const GetLectures = async(req,res)=>{
    try{

          const {courseid} = req.params

        // now we will check if this id is present or not 
    
        const course = await CourseModel.findById(courseid)
        if(!course){
            return res.status(401).json({message:'Courseid is incorrect'})
        }
        await course.populate('Lectures')
        await course.save()  

    }catch(err){
  return res.status(401).json({message:err.message})
    }
}




module.exports = {CreateLectures , GetLectures}