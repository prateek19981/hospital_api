// import mongoose
const mongoose = require("mongoose");
const path = require("path");






//create a user schema

const reportSchema = new mongoose.Schema({
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
        
        
    },
    status:{
        type:String,
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
        

    }
 
    
},{
    timestamps:true
} );






const Report = mongoose.model('Report',reportSchema);

module.exports = Report;

