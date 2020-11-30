const express = require('express');
const router = express.Router();
const {signup,signin,signout, requireSignin}= require('../Controllers/Auths');
const{userSignupValidator} = require('../Validator/index')


router.post('/signup',userSignupValidator,signup);

router.post('/signin',signin);

// get is  signing out

router.get('/signout',signout)


// router.get('/hello',requireSignin, (req,res) => {

//     res.send("hello there")
// })


module.exports = router