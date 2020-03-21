const express=require('express');
const router=express.Router();
const admin_cont=require('../controllers/admin');
const user_cont=require('../controllers/user');

router.get('/addp',user_cont.userIdForEachLink,admin_cont.getAddProduct); 
   
router.post('/addp',user_cont.userIdForEachLink,admin_cont.postAddProduct);

router.get('/adminp',user_cont.userIdForEachLink,admin_cont.getAdminProduct);

router.get('/edit/:productId',user_cont.userIdForEachLink,admin_cont.getEditProduct);

router.post('/editpage',user_cont.userIdForEachLink,admin_cont.editandchange);

router.post('/delete',user_cont.userIdForEachLink,admin_cont.deleteProduct);

router.post('/deletefromcart',user_cont.userIdForEachLink,admin_cont.deletefromcart);

//module.exports=router;
module.exports={
    handler:router
} 
// exports.handler=router;
// exports.extratext=products;