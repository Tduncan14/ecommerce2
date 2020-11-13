const express = require('express');
const router = express.Router();
const {signup,signin}= require('../Controllers/UserController');
const{userSignupValidator} = require('../Validator/index')


router.post('/signup',userSignupValidator,signup);

router.post('/signin',signin)


module.exports = router