const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const fs = require('fs');



const UploadCloudinary = async(filePath)=>{
    cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.SECRET_KEY
});



try{
  if(!filePath)
  {
    return null
  }
 
  const Result = await cloudinary.uploader.upload(filePath , resourse_type ='auto')
   // also to delete upload pics from public folder 
   fs.unlinkSync(Result)
  return Result.secure_url

}catch(err){
   fs.unlinkSync(Result)
   console.log(err.message);
}


}


module.exports = UploadCloudinary


