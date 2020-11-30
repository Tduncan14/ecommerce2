const express = require('express');
const {
    create
} = require('../Controllers/category.js')
const {requireSignin,isAuth,isAdmin} = require('../Controllers/Auths');
const{findbyId} = require('../Controllers/UserController');
const router = express.Router();


router.post("/category/create/:userId",requireSignin,isAuth,isAdmin,create);





router.param('userId',findbyId);


module.exports = router;