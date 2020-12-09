const express = require('express');
const router = express.Router();


const {create,productById,read,remove,update,list,listRelated} = require('../Controllers/Product')
const {requireSignin,isAuth,isAdmin} = require('../Controllers/Auths')
const {findbyId} = require("../Controllers/UserController")


router.get('/product/:productId',read);
router.post('/product/create/:userById',requireSignin,isAuth,isAdmin,create)

router.delete('/product/:productId/:userById',requireSignin,isAuth,isAdmin,remove)

router.put('/product/:productId/:userById',requireSignin,isAuth,isAdmin,update)


router.get('/products',list);

// gets related products
router.get('/products/related/:productId',listRelated)

router.param("userById",findbyId);
router.param("productId",productById);


module.exports = router;