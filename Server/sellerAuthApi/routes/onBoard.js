require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var authController = require("../controllers/authControllers");

const productModel = require("../models/product");

// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser :  true},mongoose.set('strictQuery',true)).then(()=>{
//     console.log("connected");}).catch((err)=>{console.log(err);})

//Image File Storage
const Storage = multer.diskStorage({
  destination: "public/assets", // productImages file is created
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); //stored in binary format
  },
});

const upload = multer({
  storage: Storage,
}).single("productImage");

router.post("/storeProduct", authController.protectRoutes, (req, res) => {
  //store data in the database
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      const newProduct = new productModel({
        shopId: req.body.shopId,
        shopName: req.body.shopName,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productAmount: {
          weight: req.body.weight, //in kg
          amount: req.body.amount, // in pieces
        },
        productImage: {
          data: req.file.filename,
          contentType: "image/jpeg",
        },
        productPrice: req.body.productPrice,
      });
      try {
        newProduct.save().then(() => {
          console.log("saved");
          res.status(201).send(newProduct.productImage.data);
        });
      } catch (error) {
        res.status(500).send(error);
      }
    }
  });
});
router.get("/getProduct/:shopId", async (req, res) => {
  // get data from shopId
  try {
    const result = await productModel.find({ shopId: req.params.shopId });
    var productArray = [];
    result.forEach((element) => {
      const items = {
        productId: element._id,
        productName: element.productName,
        productDescription: element.productDescription,
        productPrice: element.productPrice,
        productDescription: element.productDescription,
        productImagePath: path.join(
          "..",
          "assets",
          element.productImage.data.toString()
        ),
      };
      productArray.push(items);
    });

    res.status(201).send(productArray);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", (req, res) => {
  res.send("API is working");
});
module.exports = router;
