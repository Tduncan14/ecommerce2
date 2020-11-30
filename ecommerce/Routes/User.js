const express = require("express");
const router = express.Router();


const {
    signup,
    signin,
    signout,
    requireSignin,

} = require('../Controllers/Auths');


const{findById} = require('../Controllers/UserController');


router.param('userId',userById)
router.get("/",);
router.get("/:id");
router.post("/");


module.exports = router;