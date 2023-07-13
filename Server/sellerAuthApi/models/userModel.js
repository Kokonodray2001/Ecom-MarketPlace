const mongoose =  require('mongoose');
const validator =  require('validator')
const bcrypt  = require('bcrypt');
const schema = new mongoose.Schema({
    name : {
        type: String ,
        required : true
    },
    email :{
        type:String,
        required : true,
        unique : true,
        lowercase : true, // convert to lower case
        validate:[validator.isEmail,'please provide an valid email'] //predefined validation function validator.isEmai
    },
    password :{
        type: String,
        required : true,
        minlenght : 8,
        select : false // this will not be displayed in any output
    },
    passwordConfirm :{
        type: String,
        required : true,
        validate: {
            validator :  function(el){
                return el ===  this.password; // this will only work on save not on findOneandUpdate
            },
            message : "password don't match"
        }
    },
    shopName :{
        type: String,
        required : true
    },
    shopLocation :{
        type:String,
        required : true
    },
    shopType :{
        type:String,
        required : true
    },
    passwordChangedAt : Date
});

//mongoose middleware
schema.pre('save',async function(next){ //pre save runs between getting the data and then saving it in the database
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);//12 -> lenght of salt // hash is async version
    this.passwordConfirm = undefined; //as it is already used before to confirm so we can delet it now
    next();
}); 

//instance methods -> will be avaliable on all instance of user Model
schema.methods.correctPassword = async function(candidatePassword, userPassword){
   //we are using userpassword as an parameter because this.password is not avaliable as it is made as select : false
    return await bcrypt.compare(candidatePassword,userPassword); 
}
schema.methods.changedPassword = async function(JWTTimestap){
    if(this.passwordChangedAt){
        const changeedTimeStamp =  this.passwordChangedAt.getTime();
        return changeedTimeStamp/1000 > JWTTimestap;
    }
    //false means not changed 
    return false;
}
const User =  mongoose.model("sellerTable",schema);
module.exports = User;
