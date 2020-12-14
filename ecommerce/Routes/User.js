const express = require("express");
const router = express.Router();


const {

    requireSignin,
    isAdmin,
    isAuth

} = require('../Controllers/Auths');



const{findbyId,read,update} = require('../Controllers/UserController');





router.get("/",);
router.get("/:id");
router.post("/");

router.get('/secret/:userId',requireSignin,isAuth,isAdmin, (req,res) => {

   res.json({
       user:req.profile
   })
})

router.get('/user/:userId',requireSignin,isAuth,read)
router.put('/user',requireSignin,isAuth,update)

router.param('userId',findbyId)

module.exports = router;