const express=require('express');
const router=express.Router();
const cont_auth=require('../controllers/auth');
const user_cont=require('../controllers/user');


router.get('/login',cont_auth.getLogin)

router.post('/login',cont_auth.postLogin);

router.get('/logout',cont_auth.getLogout);

router.get('/signup',cont_auth.getSignUp);

router.post('/signup',cont_auth.postSignUp);


module.exports=router;