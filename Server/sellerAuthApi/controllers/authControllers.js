require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { promisify } = require("util");
var multer = require("multer");
const userModel = require("../models/userModel")
const path = require("path");
//const connect =  require('../utils/dbConnection');
const mongoose = require("mongoose");
const { decode } = require("punycode");
const axios = require('axios');
mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true },
    mongoose.set("strictQuery", true)
  )
  .then(() => console.log("connected mongo"))
  .catch((err) => console.log(err));

const singToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const Storage = multer.diskStorage({
  destination: "public/assets", // productImages file is created
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); //stored in binary format
  },
});

const upload = multer({
  storage: Storage,
}).single("shopImage");

exports.signup = async (req, res, next) => {
  try {
    upload(req,res, async(err)=>{
      if (err) {
        res.send(err);
      }
      else{
        const {
          name,
          email,
          mobileNumber,
          password,
          confirmPassword,
          shopName,
          shopAddress,
          shopType,
          shopTimings,
        } = req.body;
    
        
    
        const newUser = await User.create({
          name: name,
          email: email,
          mobileNumber: mobileNumber,
          password: password,
          confirmPassword : confirmPassword,
          shopName: shopName,
          shopAddress: JSON.parse(shopAddress),
          shopType: shopType,
          shopTimings: JSON.parse(shopTimings),
          shopImage : {
            data : req.file.filename,
            contentType: req.body.mimetype,
          }
        });
    
        const token = singToken(newUser._id);
        const shopData = {
          shopId: newUser._id,
          shopName: newUser.shopName,
          shopType: newUser.shopType,
          shopImage: newUser.shopImage
        }
        const elasticRegister = await registerShop(shopData);
        res.status(200).json({
          JWToken: token,
          status: "success",
          data: {
            user: newUser,
          },
          elasticRegister
        });
      }
    })
  } catch(err){
    res.status(500).json({err : err.message});
    next(err);
  }
};
const registerShop = async(shopdata) =>{
    try{
      const res = await axios.post('http://localhost:4000/api/registerShop',shopdata);
      return res.data.msg;
    }
    catch(err){
      console.log(err);
    }
}
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //1) check emial and passeord exists;
    if (!email || !password) {
      throw new AppError("please provide email and password!", 400);
    }
    //2) check user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new AppError("password or email is not correct", 401);
    }
    const correct = await user.correctPassword(password, user.password); // user is an inctsnce of User model
    if (!correct) {
      throw new AppError("password or email is not correct", 401);
    }

    // 3)if all ok, send JWT back to client
    const token = singToken(user._id);

    res.send({
      status: "success",
      token: token,
      user : {
        id : user._id,
        shopName: user.shopName,
        shopType: user.shopType,
        name: user.name,
        email: user.email
      }
    });
  } catch(err){
    res.status(500).json({err : err.message});
    next(err);
  }
};

exports.getSellerInfo = async(req,res,next) =>{
  try{
    const shopId = req.params.shopId;
    let result = await userModel.findOne({_id:shopId});
    result = result.toObject();
    const shopImagePath = path.join('..','assets',result.shopImage.data.toString());
    delete result.password;
    delete result.confirmPassword;
    delete result.shopImage;
    result.shopImagePath = shopImagePath;
    console.log(result);
    res.status(200).json({sellerInfo:result});
  }
  catch(err){
    res.status(500).json({msg:err.message});
  }
}




exports.protectRoutes = async (req, res, next) => {
  //Authorize user before alloewing access to protected routes
  try {
    let token;

    //1)getting token and check if it's there -> the jwt token is formated as Authorization : Bearer JwtToken this signifies the scheme followed in authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; // token is decleared out  as in new ES6 version it is an local var inside the if block
    } else {
      throw new AppError("user not logged in ", 401);
    }

    //2)verification of token
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //    example   decode = { id: '64a997a13b53a6a2a4ea7695', iat: 1689003415, exp: 1689435415 }
    //3)check if user still exists
    const currentUser = await User.findById(decode.id);
    if (!currentUser) {
      throw new AppError(
        "the user belonging to the token no longet exists",
        401
      );
    }
    //4)checking if the password is changed
    // if(currentUser.changedPassword(decode.iat))
    //     throw new AppError("User recently changed the password please login again",401);
    //5) grant access to proceted route
    req.user = currentUser; //  putting the currentuser data to future use if needed
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next(new AppError("invalid JWT token", 401));
    } else if (error.name === "TokenExpiredError") {
      next(new AppError("Your session has expired", 401));
    } else next(error);
  }
};
