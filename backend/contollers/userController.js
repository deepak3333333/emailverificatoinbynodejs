const userModel = require("../models/userModel")

async function getUserData(req,res){
    const {userId}=req.body
    try{
        const user =await userModel.findById(userId)
        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            })
        }
        return res.json({
          success:true,
          userData:{
            name:user.name,
            email:user.email,
            isAccountVerified:user.isAccountVerified
          }

        })

    }
    catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }

}


module.exports={
    getUserData
}