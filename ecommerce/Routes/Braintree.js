const express = require('express');
const router = express.Router();
const {requireSignin,isAuth,isAdmin} = require("../controllers/auth");


router.get('/braintree/getToken/:userId',() => {
    
})


module.exports = router;