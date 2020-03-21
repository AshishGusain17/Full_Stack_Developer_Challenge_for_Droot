const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const productSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});
const nopes=mongoose.model('Product',productSchema); 

module.exports=nopes;