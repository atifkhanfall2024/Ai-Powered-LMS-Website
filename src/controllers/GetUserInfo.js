const UserModel = require("../model/UserModel")

const GetUser =  async(req,res)=>{

   try{
     const User = await UserModel.findById(req.user).select('-password')
    //console.log(User);

    if(!User){
        return res.status(404).json({message:'User not found'})
    }

    return res.json(User)
   }catch(err){
    return res.status(401).send(err.message)
   }
}

module.exports = {GetUser}