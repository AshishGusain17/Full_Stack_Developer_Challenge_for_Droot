const express=require('express');
const app=express();
const body=require('body-parser');
const mongoose=require('mongoose');
const path=require('path');
const session=require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer=require('multer');
 
// const initial =require('./routes/initial');
// const user=require('./routes/user');
// const chat=require('./routes/chat');
const auth=require('./routes/auth');
// const group=require('./routes/group');
// const refresh=require('./routes/refresh');
const admin=require('./routes/admin');
const shop=require('./routes/shop');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//app.set('views','views');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname)));
// console.log(23,path.join(__dirname),76);
app.use(body.urlencoded({extended:false}));
const fileStorage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"public/images_all");
    },
    filename:(req, file, cb)=>{
        cb(null,Date.now() + '-' + file.originalname);
    }
});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}


app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image')); 

const store = new MongoDBStore({
    uri: 'mongodb+srv://AshishGusain17:password17@cluster0-werpd.mongodb.net/Droot_Challenge?retryWrites=true&w=majority',
    collection: 'mySessions'
  });
  
app.use(session({secret:'mysecret',
                resave:false,
                saveUninitialized:false,
            store:store}));
// app.use(user);
// app.use(initial);
// app.use(chat);
// app.use(group);
// app.use(refresh);
app.use(auth);
// app.use(pdfs);
app.use(admin.handler);
app.use(shop);

app.use((req,res,next)=>{
    res.render('error',{tit:'error-no-url',isAuthenticated:false}); 
})

mongoose.connect('mongodb+srv://AshishGusain17:password17@cluster0-werpd.mongodb.net/Droot_Challenge?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true })
        .then(ob=>{
            app.listen( 2000);
            // app.listen(process.env.PORT || '0.0.0.0' );
            console.log('connected_via_mongooseJS',51);
        })
        .catch(err=>{console.log(5,err,78);});

 