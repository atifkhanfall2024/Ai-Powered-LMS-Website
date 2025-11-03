const UserModel = require('../model/UserModel')
const Valid = require('validator')
const hashes = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const Hashotp  = require('../utils/HashOtp')

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

     return res.status(200).json({message: user})
        
        

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

    res.cookie('Token' , Token , {
        httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true on Vercel
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
     
      maxAge: 60 * 60 * 1000
    })

    res.json({message: User})
    }catch(err){
        return res.status(500).json({message:err.message})
    }

}


// Logout api

const Logout = async(req, res)=>{

try{
     await res.clearCookie("Token")
   return  res.status(200).json({messgae: 'Logout SuccessFully !'})
}catch(err){
  return res.status(400).json({messgae: err.message})
}
}

const OTPVerify = async(req,res)=>{

   try{
     // first email will be enter by user 
  const {email} = req.body

 // const users = req.user
  //console.log(users);

  // generate 6 digit otp 
     const code = Math.floor(100000 + Math.random() * 900000);
       const value = code.toString()

       const encr = await Hashotp({value})

      

  // then check in database

  const user = await UserModel.findOne({email})

  if(!user){
    return res.status(401).json({message:"User Not Present"})
  }

   // this otp save into database
       
        user.otp=encr
       
        // to store session email

        req.session.email = email

       // console.log(req.session.email);
      

        const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,       
    pass: process.env.EMAIL_PASS   
  }
});

    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: email, 
      subject: "Email Verification OTP",
      text: `Your OTP code is ${code}. It is valid for 2 minutes.`,
    };
     await transporter.sendMail(mailOptions);
      await user.save()
      
    
         res.status(201).send('OTP Send to your email for verification')

      
   }catch(err){
      res.status(401).json({message:err.message})
   }
     
   
}

const VerifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.session.email
    
    if (!email) {
      return res.status(400).json({ message: "Session expired. Please resend OTP." });
    }
   // console.log(email);
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

   
  const enteredOtp = otp.toString();
    const isMatch = await hashes.compare(enteredOtp, user.otp);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    user.otp = null;
    user.otpExpires = null;
    user.isVerify = true
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// creating new passward 

const NewPassword = async(req,res)=>{
     try{
      
  const {password} = req.body
 const email = req.session.email
    
    if (!email) {
      return res.status(400).json({ message: "Session expired. Please resend OTP." });
    }
   const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });


     if(user.isVerify != true){
      return res.status(402).json({message:"Alert : Verification not done"})
    }

    if(!Valid.isStrongPassword(password)){
      return res.status(402).json({message:"Passward should be strong"})
    }
    
    

   const hashedPass = await hashes.hash(password, 10);
user.password = hashedPass;
user.isVerify = false
    req.session.destroy();
await user.save();

     return res.status(201).json('Passward Reset Success')
     }catch(err){
      return res.status(501).json({message:err.message})
     }
}


// google auth

const GoogleAuth = async(req,res)=>{
  
  try{
    const {fullName , email , role} = req.body

    const user = await UserModel.findOne({email})

    if(!user){
      user = await UserModel.create({
        fullName,
        email ,
        role ,
        isGoogleUser:true
      })
    }

        const Token = jwt.sign({_id :user.id} , process.env.JWT_SECRET  , {expiresIn:'1h'} )

    res.cookie('Token' , Token , {
      httpOnly: true,
      secure : false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000
    })
    return res.status(201).json({message:user})

  }catch(err){
     return res.status(501).json({message:err.message})
  }


}

module.exports = {Signup , Login , Logout , OTPVerify , VerifyOtp , NewPassword , GoogleAuth}
