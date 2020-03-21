const user=require('../data/user');

const userIdForEachLink=(req,res,next)=>{
    // console.log(23,req.session,7);
    if(req.session.loggedIn){
        user.findById(req.session.us._id)
        .then(obj=>{
                req.getobj=obj;
                next();
        })
        .catch((err)=>{console.log(66,err,67);});
    }
    else{
        console.log(43,'first log in',5);
        res.redirect('/login');
    }
     
};  


const alreadyLogIn=(req,res,next)=>{
    if(req.session.loggedIn){
        res.redirect('/');
    }
    else{
        next();
    }
}
      
module.exports={
    userIdForEachLink:userIdForEachLink,
    alreadyLogIn:alreadyLogIn
}     


