const JWT = require('jsonwebtoken')
require('dotenv').config()
const User = require('../model/UserModel')

const ValidateToekn = async(req, res,next)=>{

     try{
          // first it will take token from cookie

     const token = req.cookies.Token

    //console.log(token);
    if(!token){
        return res.status(401).json({message: 'Token is Not Present . Please Login !'})
    }

    // if token is present then from this token extract id of login user

      const Verify  =  JWT.verify(token , process.env.JWT_SECRET)
       
      if(!Verify){
        return res.json({message: 'User is Not Verified !'})
      }

      // now also check that this id is present or not in database

      const user = await User.findById({_id:Verify._id})

      //console.log(user);

      if(!user){
         return res.json({message: 'User Not Found !'})
      }

      req.user = user
     next()
     }catch(err){
        return res.status(500).json({message: err.message})
     }

}

module.exports =  ValidateToekn