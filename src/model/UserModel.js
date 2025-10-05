const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
     
    },

    role: {
      type: String,
      enum: ["student", "educator"],
       lowercase: true ,
      default: "student",
    },
   description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
      default: "",
    },
    photoUrl: {
      type: String,
      default: "",
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/,
        "Please provide a valid image URL",
      ],
    },
   otp: {
  type: String,
  required: false, // or just remove required
  default: null
},
otpExpires: {
  type: Date,
  default: null
},
  isVerify:{
   type:Boolean,
   default:false
  },
  },

  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
