const express=require('express');
const router=express.Router();
const cont_auth=require('../controllers/auth');
const user_cont=require('../controllers/user');


router.get('/login',cont_auth.getLogin)

router.post('/login',cont_auth.postLogin);

router.post('/logout',cont_auth.getLogout);

router.get('/signup',cont_auth.getSignUp);

router.post('/signup',cont_auth.postSignUp);

// router.get('/reset',cont_auth.getResetPassword);

// router.post('/reset',cont_auth.postResetPassword);

// router.get('/resetactual/:token',cont_auth.getResetPasswordActually);

// router.post('/resetactual',cont_auth.postResetPasswordActually);

module.exports=router;