const Patient = require("../models/users/patient");
const bcrypt = require("bcryptjs");
const Report = require("../models/report");

module.exports.signup = async function(req,res){
    try{

            console.log(req.body)
            const {phone,email,password,name} = req.body;
            if(!email||!password||!name||!phone){
                return res.status(422).json({
                    error:"please fill all details"
                })
            }
        
            let pat = await Patient.findOne({
                phone:phone
            }).populate("doctor");
            if(pat)
            {
                return res.json({
                    error:"patient already present",
                    data:pat
                })
            }
        
            else
            {
                const hashedPassword = await bcrypt.hash(password,12);
                let pat = new Patient({
                    email:email,
                    password:hashedPassword,
                    name:name,
                    phone:phone,
                    doctor:req.user
                     
        
                })
                pat.save();
                return res.json({
                    message:"successfully submitted patient data",
                    
                })
            }

    }catch(err)
    {
        console.log(err);

    }
}




module.exports.createReport = async function(req,res)
{
    try{

            const {id} = req.params;
            const {status} = req.body;
            let pat = await Patient.findOne({phone:id});
            console.log("pat",pat)
            console.log(req.user);
            const rep = new Report({
                status:status,
                doctor:req.user,
                patient:pat

                    
        
            })
        
            rep.save();
            
            return res.json({
                message:"report created",
        
            })

    }catch(err)
    {
        console.log(err)
    }
   



}


module.exports.allReports = async function(req,res)
{
    try{

            const {id} = req.params;
            console.log(id);
            let pat = await Patient.findOne({phone:id});
            console.log("pat",pat);
            const rep = await Report.find({patient:pat}).populate('doctor').populate('patient');
            console.log("report",rep);
            
        
            
            return res.json({
                message:"fetched all reports",
                data:rep

                
        
            })

    }catch(err)
    {
        console.log(err)
    }
   



}


module.exports.allReportsbyStatus = async function(req,res)
{
    try{

            const {status} = req.params;
            const rep = await Report.find({status:status}).populate('doctor').populate('patient');
            console.log("report",rep);
            
        
            
            return res.json({
                message:"fetched all reports",
                data:rep

                
        
            })

    }catch(err)
    {
        console.log(err)
    }
   



}