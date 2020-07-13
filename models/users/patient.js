// import mongoose
const mongoose = require("mongoose");
const path = require("path");






//create a patient schema

const patientSchema = new mongoose.Schema({
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        

    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"



    },
    name:{
        type:String,
        required:true
    },
 
    
},{
    timestamps:true
} );






const Patient = mongoose.model('Patient',patientSchema);

module.exports = Patient;

