const userModel = require("../models/userModel");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

async function register(req, res) {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.json({
      success: false,
      message: "Please provide all the required details",
    });
  }
  try{
    const userAlreadyExits=await userModel.findOne({email});
    if(userAlreadyExits){
        return res.json({
            success:false,
            message:"User already exits"
        })
     
    }
    // const user=await userModel.create({name,email,password}); no need of save method
    const hashedPassword=await bcrypt.hash(password,10)
    const user=new userModel({name,email,password:hashedPassword});
    await user.save();
    const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"7d"})
   return res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:7*24*60*60*1000
   })
    
  }
  catch(err){
        return res.json({
            success:false,
            message:err.message
        })
  }




}

module.exports = { register };
