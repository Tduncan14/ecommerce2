const express = require('express');
const {
    create,
    categoryById,
    read,
    remove,
    update,
    list
} = require('../Controllers/category.js')
const {requireSignin,isAuth,isAdmin} = require('../Controllers/Auths');
const{findbyId} = require('../Controllers/UserController');
const router = express.Router();




router.get('/category/:categoryId',read)

router.post("/category/create/:userId",requireSignin,isAuth,isAdmin,create);

router.put("/category/:categoryId/:userId",requireSignin,isAuth,isAdmin,update)

router.delete("/category/:categoryId/:userId",requireSignin,isAuth,isAdmin,remove)

router.get('/categories',list)

router.param('categoryId',categoryById)
router.param('userId',findbyId);


module.exports = router;