const mongodb=require('mongodb');
// const getthedb=require('../util/database').getDb;
// const mongoose=require('mongoose');
// const Schema=mongoose.Schema;
const nopes=require('../data/product');
const user=require('../data/user');
const orders=require('../data/order');

const getAddProduct=(req,res,next)=>{
    console.log('1');
    res.render('admin/editp',{tit:'addp-ejs',message:false,editing:false,isAuthenticated:req.session.loggedIn});
    console.log('2');
}; 

const postAddProduct=(req,res,next)=>{
    if(!req.file){
        return res.render('admin/editp',{tit:'addp-ejs',message:'Fill all the details',editing:false,isAuthenticated:req.session.loggedIn});
    }
    title=req.body.title.trim();
    price=req.body.price;
    path=req.file.path;
    description=req.body.description.trim();
    userId=req.getobj._id;
    obj={title:title,
        price:price,
        path:path,
        description:description,
        userId:userId};
    console.log(67,req.file,68);
    if(title=='' || description==''){
        return res.render('admin/editp',{tit:'addp-ejs',message:'Fill all the details',editing:false,isAuthenticated:req.session.loggedIn});
    }
    const obj1=new nopes(obj);
    obj1.save()
        .then(re=>{
            console.log(2,'going from save()',3);
            res.redirect('/');
        })
        .catch(err=>{console.log(39,err,40);});
        
    console.log('4');  
//
}; 

const getAdminProduct=(req,res,next)=>{
    console.log('10');
    nopes.find({userId:req.session.us._id})
        // .select('title price -_id')
        // .populate('userId','name')
        .then(arr=>{
            console.log(52,arr,53);
            res.render('admin/p',{tit:'admin-edit_ejs',prods:arr,isAuthenticated:req.session.loggedIn});
        })
        .catch(err=>{console.log(50,err,51);});
}   

const getEditProduct=(req,res,next)=>{
    console.log('111');
    const qu=req.query.edit;
    if(!qu){
        return res.redirect('/');
    }
    const idhere=req.params.productId;
    nopes.findById(idhere)
            .then(obj=>{
                console.log(3,obj.userId,req.session.us._id,56);
                if(obj.userId.toString()===req.session.us._id.toString()){
                    console.log(54,obj,55);
                    res.render('admin/editp',{tit:'edit-ejs',message:false,editing:qu,product:obj,isAuthenticated:req.session.loggedIn});
                }
                else{
                    res.redirect('/');
                }
            })
            .catch(err=>{console.log(56,err,57);}); 
}

const editandchange=(req,res,next)=>{
    let path;
    if(!req.file){
        path=req.body.path;
    }
    else{
        path=req.file.path;
    }
    let title=req.body.title;
    let price=req.body.price;
    let des=req.body.description;
    let idhere=req.body.idd;
    console.log(title,price,path,des,idhere);
    nopes.findById(idhere)
            .then(obj=>{
                obj.title=title;
                obj.price=price;
                obj.path=path;
                obj.description=des;
                obj.save().then(a=>{
                    console.log(4,a,45);
                    res.redirect('/');
                })
                .catch(err=>{console.log(49,err,23);});
            })
            .catch(err=>{console.log(39,err,40);});
}   




const deleteProduct=(req,res,next)=>{
    idhere=req.body.idd; 
    pr=req.body.prr;
    nopes.findByIdAndRemove(idhere)
                        .then(result=>{
                                //console.log(57,result,58);
                                res.redirect('/');
                            })
                        .catch(err=>{console.log(39,err,40);});
} 

const deletefromcart=(req,res,next)=>{
    idhere=req.body.idd;           //id of product
    pr=req.body.prr;
    itemss=req.getobj.cart.items;
    let ind=-1;
    ind=itemss.findIndex((pa)=>{
        //console.log(4,pa.productId,idhere,56);
        return (pa.productId.toString()===idhere.toString());
    })
    let upcart={};
    console.log(34,ind,3);
    if(itemss[ind].qty>1){
        itemss[ind].qty=itemss[ind].qty-1 ;
        upcart={items:[...itemss]} ;
    }
    else{ 
        item=itemss.filter(res=>{
            //console.log(98,res,97);
            return (res.productId.toString()!==idhere.toString());
        })
        upcart={items:[...item]};
    }
    console.log(45,upcart,2);
    user.findById(req.getobj._id)
            .then(obj=>{
                obj.cart=upcart;
                obj.save()
                    .then(ob=>{
                        res.redirect('/cart');
                    })
                    .catch(err=>{console.log(19,err,40);})
            })
            .catch(err=>{console.log(99,err,40);})
}

module.exports={
    getAddProduct:getAddProduct,
    getEditProduct:getEditProduct,
    postAddProduct:postAddProduct,
    getAdminProduct:getAdminProduct,
    editandchange:editandchange,
    deleteProduct:deleteProduct,
    deletefromcart:deletefromcart,
    nopes:nopes
}     
