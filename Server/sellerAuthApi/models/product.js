var mongoose =  require('mongoose');

var productSchema = mongoose.Schema({
    shopId:{
        type:String,
        require : true
    },
    shopName:{
        type: String,
        required : true
    },
    productName:{
        type: String,
        required : true
    },
    productImage:{
        data:Buffer,
        contentType:String
    },
    productDescription:{
        type:String
    },
    productAmount:{
        weight:{
            type:Number, //in KG
            default :-1
        },
        amount:{
            type:Number, //or in piece
            default:-1
        }
    },
    productPrice:{
        type:String
    }

})
var productModel =  mongoose.model('productModel',productSchema);
module.exports = productModel;