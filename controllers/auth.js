// const bcrypt=require('bcrypt');
const nodemailer=require('nodemailer');
// const crypto=require('crypto');

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

const getResetPassword=(req,res,next)=>{
    res.render('auth/reset',{tit:'check_email',isAuthenticated:false,message:false})
}

const postResetPassword=(req,res,next)=>{
    email=req.body.email;
    user.findOne({email:email})
        .then(obj=>{
            if(obj){
                crypto.randomBytes(32,(err,buffer)=>{
                    if(err){
                        console.log(6,err,23);
                    }
                    else{
                        token=buffer.toString('hex');
                        timelimit=Date.now() + 3600000;
                        obj.token=token;
                        obj.timelimit=timelimit;
                        console.log(45,obj.timelimit,obj.token,token,timelimit,3);
                        obj.save()
                        .then(k=>{
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'aaashishgusain123456789@gmail.com',
                                    pass: 'Iamnotashish1!'
                                }
                                }); 
                            const mailOptions = {
                                from: 'ashish@gmail.com',
                                to: email,
                                subject: 'Resetting the password',
                                html: `<h1>U wished to reset the password</h1>
                                        <p>to reset <a href='http://localhost:3000/resetactual/${token}'>click</a>on the given link</p>`
                            };
                            transporter.sendMail(mailOptions)
                                .then(info=>{
                                    console.log('Email sent: ' + info.response);
                                    res.redirect('/');
                                })
                                .catch(err=>{console.log(34,err,76);});
                        })
                        .catch(err=>{console.log(64,err,56);});
                    }    
                })    
            }
            else{
                res.render('auth/reset',{tit:'check_email',isAuthenticated:false,message:'no such email, firstly signup'})
            }
        })
        .catch(err=>{console.log(7,err,34);});
}

const getResetPasswordActually=(req,res,next)=>{
    token=req.params.token;
    console.log(4,token,78); 
    user.findOne({token:token,timelimit:{ $gt:Date.now() }})
        .then(obj=>{
            // console.log(65,obj,7);
            res.render('auth/resetactual',{tit:'pass_change',token:token,email:obj.email,isAuthenticated:false,message:false})
        })
        .catch(err=>{console.log(98,err,4);});
    
}

const postResetPasswordActually=(req,res,next)=>{  
    email=req.body.email;
    originalPassword=req.body.originalPassword;
    newPassword=req.body.newPassword;
    // console.log(email,newPassword,originalPassword);
    user.findOne({email:email,token:token,timelimit:{ $gt:Date.now() }})
        .then(obj=>{
            bcrypt.compare(originalPassword,obj.password)
                .then(bool=>{
                    if(bool){
                        bcrypt.hash(newPassword,10)
                            .then(hashed=>{ 
                                obj.password=hashed;
                                obj.timelimit=undefined;
                                obj.token=undefined;
                                obj.save()
                                    .then(a=>{
                                        console.log(34,'password reset',56);
                                        res.redirect('/login');
                                    })
                                    .catch(err=>{console.log(57,err,56);});
                            })
                            .catch(err=>{console.log(17,err,74);});
                    }
                    else{
                        res.redirect('/reset');
                    }
                })
                .catch(err=>{console.log(7,err,78);});
        })
        .catch(err=>{console.log(7,err,78);});
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
    postSignUp:postSignUp,
    getResetPassword:getResetPassword,
    postResetPassword:postResetPassword,
    getResetPasswordActually:getResetPasswordActually,
    postResetPasswordActually:postResetPasswordActually
}      










