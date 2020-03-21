const mongoose=require('mongoose');
const Schema=mongoose.Schema;
userSchema=new Schema({
    accountName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    token:String,
    timelimit:Date,
    cart:{
        items:[{
            productId:{
                type:Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            qty:{
                type:Number,
                required:true
            }
        }]
    }
});

const user=mongoose.model('User',userSchema); 
module.exports=user;



//{       user:'qwerty'  ,  email:'qwerty@1234'  ,  cart:{items:[]}    }