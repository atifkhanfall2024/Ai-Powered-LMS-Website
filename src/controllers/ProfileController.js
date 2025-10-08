const UploadCloudinary  = require('../Config/cloudinary')
const UserModel = require('../model/UserModel')

// edit profile section

const EditProfile  = async(req,res)=>{

   try{
     const isUser = req.user._id

    const {fullName , description} = req.body

    

    let photoUrl

    // const AvalivbleUpdates = ["fullName" , "description" , "photoUrl"]
    // const Keys =  Object.keys(req.body)

    // const isValidUpdate = Keys.every((key) => AvalivbleUpdates.includes(key));
    // if(!isValidUpdate){
    //      return res.status(401).json({message:'Update Not Avalible'})
    // }

     if (fullName && fullName.trim() === "") {
      return res.status(400).json({ message: "Full name cannot be empty" });
    }

    if(req.file){
        photoUrl = await UploadCloudinary(req.file.path)
    }

    // now find user and update

    const user = await UserModel.findByIdAndUpdate(isUser , {
        fullName , description , photoUrl
    })

     
    if(!user){
        return res.status(404).json({message:'User not found'})
    }

    await user.save()

    res.status(200).json({message:user})
 
     
   }
   catch(err){
     res.status(501).json({message:err.message})
   }
}

module.exports = EditProfile