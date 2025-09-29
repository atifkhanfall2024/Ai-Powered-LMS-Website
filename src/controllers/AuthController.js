const UserModel = require('../model/UserModel')
const Valid = require('validator')

const Signup = async(req , res)=>{
    try{

        // it will accept user name as well as email passward 

        const {fullName , email , password , role} = req.body

        const ValidRole = ["student" , "educator"]

        if(!ValidRole.includes(role)){
            return res.status(500).send('Role is Not Valid')
        }

        if(!Valid.isEmail(email)){
             return res.status(500).send('Email is Not Valid')
        }

        if(!Valid.isStrongPassword(password)){
             return res.status(500).send('Passward Must Be Strong')
        }

      const user = new UserModel({
        fullName ,
        email ,
        role ,
        password
      })

      await user.save()

     return res.status(200).json({message: `${fullName} Signup SuccessFully`})
        
        

    }catch(err){
        return res.status(500).json({message:err.message})

    }
}


module.exports = {Signup}
