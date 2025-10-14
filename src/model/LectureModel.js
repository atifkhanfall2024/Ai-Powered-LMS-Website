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
    type:Boolean
 }

})


const VedioModel = mongoose.model("Lectures" , Lectures)

module.exports = VedioModel