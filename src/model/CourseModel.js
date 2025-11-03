const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    course_title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      minlength: [3, "Course title must be at least 3 characters"],
      maxlength: [100, "Course title must be less than 100 characters"],
    },
    course_subTitle: {
      type: String,
     // required: [true, "Course subtitle is required"],
      trim: true,
      minlength: [5, "Subtitle must be at least 5 characters"],
      maxlength: [200, "Subtitle must be less than 200 characters"],
    },
    course_price: {
      type: Number,
     // required: [true, "Course price is required"],
      min: [0, "Price cannot be negative"],
      default: 0,
    },
    course_Thumbnails: {
      type: String,
      //required: [true, "Thumbnail URL is required"],
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(v);
        },
        message: props => `${props.value} is not a valid image URL!`,
      },
    },
    course_level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    descriptions:{
     type:String,
     
    },
    course_Category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    Enrolled_Std: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User' ,
      min: [0, "Enrolled students cannot be negative"],
    },
    Lectures: [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Lecture' ,
      min: [0, "Lectures cannot be negative"],
    }],
    Creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Course creator is required"],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    Review: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "review",
        },
        rating: {
          type: Number,
          min: [1, "Rating must be at least 1"],
          max: [5, "Rating cannot exceed 5"],
        },
        comment: {
          type: String,
          trim: true,
          maxlength: [500, "Comment cannot exceed 500 characters"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
