const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const orderSchema=new Schema({
    items:[{
        productId:{
            type:Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        qty:{
            type:Number,required:true}
        // title:{
        //     type:String,required:true},
        // price:{
        //     type:Number,required:true},
        // imageUrl:{
        //     type:String,required:true}
    }],
    user:{
        id:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        email:{
            type:String,
            required:true
        }
    }
});
const orders=mongoose.model('Order',orderSchema); 

module.exports=orders;