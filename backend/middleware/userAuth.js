const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const {token} = req.cookies;
 
  
  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized or Login ",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    
    

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
     
    } else {
      return res.json({
        success: false,
        message: "Not Authorized or Login ",
      });
    }
    next();
   
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = userAuth;
