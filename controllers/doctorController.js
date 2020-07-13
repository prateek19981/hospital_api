const Doctor = require("../models/users/doctor");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secret")




// module.exports.update = async function(req,res){
    
//     try{

//         let user = await User.findById(req.user._id);
//         User.uploadedAvatar(req,res,function(err){
//             if(err)
//             {
//                 console.log(err);
//                 return;
//             }

//             if(req.file)
//             {
//                 if(user.avatar)
//                 {
                  
//                     if(fs.existsSync(path.join(__dirname,"..",user.avatar))) {

                      
//                         fs.unlinkSync(path.join(__dirname,"..",user.avatar));
//                         console.log("file deleted");
                    
//                     };
                  
                 

                    
                   
//                     user.avatar = User.avatarPath+'/'+req.file.filename;
                
                    
                    

//                 }
               
//             }
//             user.save();
//             return res.redirect('back');
//         } );


//     }catch(err){
//         req.flash("error",err);
//         return res.redirect("back");

//     }

    
  
// }

module.exports.signup = async function(req,res){
    try{

            console.log(req.body)
            const {email,password,name} = req.body;
            if(!email||!password||!name){
                return res.status(422).json({
                    error:"please fill all details"
                })
            }
        
            let doc = await Doctor.findOne({
                email:email
            });
            if(doc)
            {
                return res.json({
                    error:"user already present"
                })
            }
        
            else
            {
                const hashedPassword = await bcrypt.hash(password,12);
                let doctor = new Doctor({
                    email:email,
                    password:hashedPassword,
                    name:name,
        
                })
                doctor.save();
                return res.json({
                    message:"successfully submitted doctor data",
                    data:doctor
                })
            }

    }catch(err)
    {
        console.log(err);

    }
}

module.exports.signin = async function(req,res){
    try{
            const { email,password } = req.body;
            console.log("body",req.body);
            if(!email||!password)
            {
                return res.status(422).json({
                    error:"please fill all details"
                })
            }
        
            let doc = await Doctor.findOne({
                email:email
                
            })
            if(!doc)
            {
                return res.status(422).json({
                    error:"invalid username or password"
                })
            }
            let match = await bcrypt.compare(password,doc.password)
            if(!match){
                return res.status(422).json({
                    error:"invalid username or password"
                })
                
            }
            
            const token = jwt.sign({_id:doc._id},JWT_SECRET)
            return res.json({
                message:"doctor signin success",
                data:doc,
                token:token
            })

    }catch(err){
        console.log(err)
    }
   
}



// module.exports.create = function(req,res){
//     if(req.body.password!=req.body.confirmpassword){
//         return res.redirect("back");
//     }

//     User.findOne({email:req.body.email},function(err,result){
//         if(err){
//             console.log("error in finding user",err);
//             return;
//         }

//         if(!result)
//         {
//             User.create(req.body,function(err,result){
//                 if(err)
//                 {
//                     console.log("err in creating user",err);
//                     return;
//                 }
                
                
//                 return res.redirect("/user/signin");
//             } )
//         }
//         else{
//             return res.redirect("back");
//         }

//     });


    
    



// }

// module.exports.createSession = function(req,res){
    
//     req.flash('success' , 'logged n successfully');
//     console.log("session created");
//     return res.redirect('/home');
// }


// module.exports.destroySession = function(req,res){

//     req.logout();
//     req.flash('success' , 'you are logged out');
//     return res.redirect("/");
// }