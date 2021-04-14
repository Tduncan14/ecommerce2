const express = require('express');
const router = express.Router();
const {requireSignin,isAuth} = require("../controllers/auth");
const{findbyId} = require('../controllers/UserController');
const {generateToken} = require('../controllers/braintree');


router.get('/braintree/getToken/:userId',requireSignin,isAuth,generateToken,() => {



})


router.param('userId',findbyId)

module.exports = router;