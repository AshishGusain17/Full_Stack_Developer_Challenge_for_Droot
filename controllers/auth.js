const user=require('../data/user');


const getLogin=(req,res,next)=>{
    res.render('auth/login',{tit:'login',message:false,isAuthenticated:false});
} 

const postLogin=(req,res,next)=>{
    password1=req.body.password.trim();
    name1=req.body.accountName.trim();
    if (password1=='' || name1==''){
        res.render('auth/login',{tit:'login',message:'Fill all the login details',isAuthenticated:!req.session.loggedIn});
    }
    user.findOne({accountName:name1})
        .then(user=>{
            if(user){
                console.log(76,user.password,password1,09);
                if(user.password==password1){
                    req.session.loggedIn=true;
                    req.session.accountName=name1;
                    req.session.us=user;
                    res.redirect('/');
                }
                else{
                    res.render('auth/login',{tit:'login',message:'Enter correct password',isAuthenticated:!req.session.loggedIn});
                }  
            }
            else{
                res.render('auth/login',{tit:'login',message:'Firstly signUp',isAuthenticated:!req.session.loggedIn});
            }
        })
        .catch(err=>{console.log(13,err,81);});
}



const getSignUp=(req,res,next)=>{
    res.render('auth/signup',{tit:'signup',message:false,isAuthenticated:false});
} 

const postSignUp=(req,res,next)=>{
    password1=req.body.password.trim();
    name1=req.body.accountName.trim();
    email1=req.body.email;
    object={
        password:password1,
        accountName:name1,
        email:email1
        // details:[],
        // cart:{items:[]}
    };
    console.log(54,name1,password1,email1,94);
    if (password1=='' || name1=='' ||email1=='')
    {
        res.render('auth/signup',{tit:'signup_again',message:'Fill all the details',isAuthenticated:req.session.loggedIn});
    }
    else{
        user.findOne({accountName:name1})
        .then(obj=>{
            if(obj){
                console.log(78,name1,password1,email1,98);
                res.render('auth/signup',{tit:'signup_again',message:'User already exists',isAuthenticated:req.session.loggedIn});
            }
            else{
                console.log(67,name1,password1,email1,29);
                obj1=new user(object);
                obj1.save()
                    .then(a=>{
                        res.redirect('/');
                    })
                    .catch(err=>{console.log(3,err,8);});

            } 
        })
        .catch(err=>{console.log(83,err,82);}); 
    }
}


const getLogout=(req,res,next)=>{
    req.session.destroy(err=>{
        console.log(34,err,8);
        res.redirect('/');
    });  
} 

module.exports={
    getLogin:getLogin,
    postLogin:postLogin,
    getLogout:getLogout,
    getSignUp:getSignUp,
    postSignUp:postSignUp
}      










