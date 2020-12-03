const express = require('express');
const router = express.Router();


const {create} = require('../Controllers/Product')
const {requireSignin,isAuth,isAdmin} = require('../Controllers/Auths')
const {findbyId} = require("../Controllers/UserController")

router.post('/product/create/:userById',requireSignin,isAuth,isAdmin,create)



router.param("userById",findbyId)


module.exports = router;