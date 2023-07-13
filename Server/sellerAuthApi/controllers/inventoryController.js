const InventoryModel =  require('../models/inventoryModel');
const AppError = require('../utils/appError');
// middlewares-
exports.getQuant = async (req,res,next)=>{
    try {
        const {productId} =  req.query;
        console.log(productId);
        const filter = {productId : productId};
        const result = await InventoryModel.findOne(filter);
        if(result)
            res.send(result);
        else
            throw new AppError('product does not exists',401);
    } catch (error) {
        next(error);
    }
}

exports.addItem = async (req,res,next)=>{
try {
const productInventory =  await InventoryModel.create(req.body);
res.send(productInventory);
} catch (error) {
    next(error)
}
}

exports.updateQuantity = async (req,res,next)=>{
    try {
        const filter = {productId : req.body.productId};
        const update= {quantity : req.body.quantity};
        const result = await InventoryModel.findOneAndUpdate(filter,update,{ new: true });
        if(result)
            res.send(result);
        else
            throw new AppError("quantity not changed",401);
    } catch (error) {
        next(error)
    }
}


