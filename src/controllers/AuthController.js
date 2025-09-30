const UserModel = require('../model/UserModel')
const Valid = require('validator')
const hashes = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
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
          
        const Check_email = await UserModel.findOne({email})

        if(Check_email){
             return res.status(400).send('Email Already Exist')
        }
         

        const HashPassward = await hashes.hash(password , 10)


      const user = new UserModel({
        fullName ,
        email ,
        role ,
        password : HashPassward
      })

      await user.save()

     return res.status(200).json({message: `${fullName} Signup SuccessFully`})
        
        

    }catch(err){
        return res.status(500).json({message:err.message})

    }
}


// Login Api 

const Login  = async(req, res)=>{
 
    try{
            const {email , password} = req.body

    // check that if mail is present or not

    const User = await UserModel.findOne({email})
    if(!User){
        return res.status(400).send('Invalid Credantials....')
    }

    //console.log(User);

    const Compare_Password = await hashes.compare(password , User.password )

    if(!Compare_Password){
          return res.status(400).send('Invalid Credantials....')
    }

    // now i want to make jwt cookies and wrap it into cookies

    const Token = jwt.sign({_id :User.id} , process.env.JWT_SECRET  , {expiresIn:'1h'} )

    res.cookie('Token' , Token)

    res.json({message: User.fullName  + ' Login SuccessFully'})
    }catch(err){
        return res.status(500).json({message:err.message})
    }

}


module.exports = {Signup , Login}
