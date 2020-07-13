// import mongoose
const mongoose = require("mongoose");
const path = require("path");






//create a user schema

const doctorSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        

    },
    name:{
        type:String,
        required:true
    },
 
    
},{
    timestamps:true
} );






const Doctor = mongoose.model('Doctor',doctorSchema);

module.exports = Doctor;

