const mongoose = require('mongoose')


const Lectures = new mongoose.Schema({

 title:{
    type:String,
    required:true
 } ,
 VedioUrl:{
    type:String
 },
 isFree:{
    type:Boolean,
    default:false
 }

}, {timestamps:true})


const VedioModel = mongoose.model("Lecture" , Lectures)

module.exports = VedioModel