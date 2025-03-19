const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  transporter  = require("../config/nodemailer");


async function register(req, res) {

  //it is asking all fields from the body
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.json({
      success: false,
      message: "Please provide all the required details",
    });
  }
  try {
    //checking if user already exits
    const userAlreadyExits = await userModel.findOne({ email });
    if (userAlreadyExits) {
      return res.json({
        success: false,
        message: "User already exits",
      });
    }
    // const user=await userModel.create({name,email,password}); no need of save method
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to our website",
      text: `Hello there, your account has been registered using ${email}.`,
      html: `
        <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to Our Website!</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; text-align: center;">
  <div style="max-width: 500px; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin: auto;">
    <h2 style="color: #333;">🎉 Welcome to Our Community! 🎉</h2>
    <p style="color: #555; font-size: 16px;">Hello there,</p>
    <p style="color: #555; font-size: 16px;">Your account has been successfully registered using <b style="color: #0073e6;">${email}</b>.</p>
    <p style="color: #555; font-size: 16px;">We are thrilled to have you on board! Get ready for an amazing journey with us.</p>
    <p style="color: #555; font-size: 16px;">Click the button below to log in and explore:</p>
    <a href="https://yourwebsite.com/login" style="display: inline-block; padding: 10px 20px; background-color: #0073e6; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 5px;">Log in Now</a>
    <p style="color: #555; font-size: 14px; margin-top: 20px;">If you have any questions, feel free to <a href="mailto:support@yourwebsite.com" style="color: #0073e6; text-decoration: none;">contact us</a>.</p>
  </div>
</body>
</html>

      `
    };
    
    await transporter.sendMail(mailOption);
    
    




    return res.json({ success: true, message: "User created successfully" });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please provide all the required details",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "invalid email",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "invalid password",
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
}


async function logout(req, res) {
  try{
    res.clearCookie("token",{
      httpOnly: true,
    });
    return res.json({
      success: true,
      message: "User logged out successfully",
    });

  }
  catch(err){
    return res.json({
      success: false,
      message: err.message,
    });
  }
}



async function sendVerificationOtp(req,res){
  try{
    const {userId}=req.body;
    const user=await userModel.findById(userId);
    if(user.isAccountVerified){
      return res.json({
        success:false,
        message:"User already verified"
      });
    }
    const otp=String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp=otp;
    user.verifyOtpExpireAt=Date.now()+24*60*60*1000;
    await user.save();
    const mailOption={
      from:process.env.SENDER_EMAIL,
      to:user.email,
      subject:"Account Verification OTP",
      text:`Your account verification OTP is ${otp}`,
      html: `
        <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to Our Website!</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; text-align: center;">
  <div style="max-width: 500px; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin: auto;">
    <h2 style="color: #333;">🎉 Welcome to Our Community! 🎉</h2>
    <p style="color: #555; font-size: 16px;">Hello there,</p>
    <p style="color: #555; font-size: 16px;">Your otp is ${otp} <b style="color: #0073e6;">${user.email}</b>.</p>
    <p style="color: #555; font-size: 16px;">verify your account within 24 ours </p>
    
    <p style="color: #555; font-size: 14px; margin-top: 20px;">If you have any questions, feel free to <a href="mailto:support@yourwebsite.com" style="color: #0073e6; text-decoration: none;">contact us</a>.</p>
  </div>
</body>
</html>

      `
    }

    await transporter.sendMail(mailOption);
    return res.json({
      success:true,
      message:"OTP sent successfully",
    });

    


  }
  catch(error){
    return res.json({
      success: false,
      message: error.message,
    });
  }

}
async function verifyOtp(req,res){
  const {userId,otp}=req.body;
  if(!userId || !otp){
    return res.json({
      success:false,
      message:"Please provide all the required details",
    });
  }
  try{
    const user=await userModel.findById(userId);
    if(!user){
      return res.json({
        success:false,
        message:"Invalid user",
      });
    }
    if(user.verifyOtp === '' || user.verifyOtp !== otp){
      return res.json({
        success:false,
        message:"Invalid OTP",
      });
    }
    if(user.verifyOtpExpireAt < Date.now()){
      return res.json({
        success:false,
        message:"OTP expired",
      });
    }
    user.isAccountVerified=true;
    user.verifyOtp="";
    user.verifyOtpExpireAt=0;
    await user.save();
    return res.json({
      success:true,
      message:"OTP verified successfully",
    })
    
  }
  catch(error){
    return res.json({
      success:false,
      message:error.message,
    });
  }
}
 //checking user is authorized or not

 async function isAuthenticated(req,res){
  try{
    return res.json({sucess:true,message:"user is autherized"})
  }
  catch(err){
    return res.json({
      success: false,
      message: err.message,
    });
  }

  
 }


 async function sendResetOtp(req,res){
  const {email}=req.body;
  if(!email){
    return res.json({
      success:false,
      message:"Please provide all the required details",
    })
  }
  try{
    const user=await userModel.findOne({email});
    if(!user){
      return res.json({
        success:false,
        message:"user not found",
      })
    }
    const otp=String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp=otp;
    user.resetOtpExpireAt=Date.now()+15*60*1000;
    user.save();
    const mailOption={
      from:process.env.SENDER_EMAIL,
      to:user.email,
      subject:"Reset Otp verification",
      text:`Your account passwod opt  is ${otp}`,
      html: `
        <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to Our Website!</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; text-align: center;">
  <div style="max-width: 500px; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin: auto;">
   
    <p style="color: #555; font-size: 16px;">Hello there,</p>
    <p style="color: #555; font-size: 16px;">Your password reset otp is ${otp} <b style="color: #0073e6;">${user.email}</b>.</p>
    <p style="color: #555; font-size: 16px;">verify your account within 15 minutes </p>
    
    <p style="color: #555; font-size: 14px; margin-top: 20px;">If you have any questions, feel free to <a href="mailto:support@yourwebsite.com" style="color: #0073e6; text-decoration: none;">contact us</a>.</p>
  </div>
</body>
</html>

      `
    }
    await transporter.sendMail(mailOption);
    return res.json({
      success:true,
      message:"OTP sent successfully",
    })
    }



  catch(err){
    return res.json({
      success: false,
      message: err.message,
    })
  }

 }

 async function resetPassword(req,res){
  const {email,otp,newPassword}=req.body;
  if(!email || !otp || !newPassword){
    return res.json({
      success:false,
      message:"Please provide all the required details",
    })
  }
  try{
    const user=await userModel.findOne({email});
    if(!user){
      return res.json({
        success:false,
        message:"user not found",
      })

    }
    if(user.resetOtp === '' || user.resetOtp !== otp){
      return res.json({
        success:false,
        message:"Invalid OTP",
      });
    }
    if(user.resetOtpExpireAt < Date.now()){
      return res.json({
        success:false,
        message:"OTP expired",
      });
    }
    const hashedPassword=await bcrypt.hash(newPassword,10);
    user.password=hashedPassword;
    user.resetOtp="";
    user.resetOtpExpireAt=0;
    await user.save();
    return res.json({
      success:true,
      message:"Password reset successfully",
    })
  }
catch(err){
  return res.json({
    success: false,
    message: err.message,
  })
}
 }




 async function deleteUser(req,res){

  const {userId}=req.body
  if(!userId){
    return res.json({
      success:false,
      message:"Please provide all the required details",
    })
  }
  try{
    const user=await userModel.findByIdAndDelete(userId);
    if(!user){
      return res.json({
        success:false,
        message:"user not found",
      })
    }
    return res.json({
      success:true,
      message:"user deleted successfully",
      user
    })


  }
  catch(err){
    return res.json({
      success: false,
      message: err.message,
    })
  }
 

 }







module.exports = { register, login,logout ,sendVerificationOtp,verifyOtp,isAuthenticated,sendResetOtp,resetPassword,deleteUser};
