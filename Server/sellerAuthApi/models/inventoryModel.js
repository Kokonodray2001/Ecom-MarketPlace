const mongoose =  require('mongoose');
const schema =  mongoose.Schema({
    productId:{
        type:String,
        require:String
    },
    shopId:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    }

})

const Inventory =  mongoose.model("inventoryTable",schema);

module.exports =  Inventory;