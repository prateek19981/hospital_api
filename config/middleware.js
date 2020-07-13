const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../secret");
const Doctor = require("../models/users/doctor");

module.exports.requireLogin = (req,res,next) =>{

    const {authorization} = req.headers;
    console.log("inside mware");
    if(!authorization)
    {
        return res.status(401).json({
            error:"only doctor can access this api"
        })
    }

    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,async (err,payload)=>{
        if(err)
        {
            console.log("error in verify token",err);
            return res.status(401).json({
                error:"only doctors can access"
            })
        }

        const {_id} = payload;
        console.log("id",_id);
        let doc = await Doctor.findById(_id);

        console.log("middleware",doc);
        if(!doc)
        {
            return res.status(422).json({
                error:"only valid doctor can register a patient"
            })
        }

        
        req.user = doc;
        next()





    })



 


}