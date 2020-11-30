const express = require("express");
const router = express.Router();


const {

    requireSignin,
    isAdmin,
    isAuth

} = require('../Controllers/Auths');



const{findbyId} = require('../Controllers/UserController');


router.param('userId',findbyId)


router.get('/secret/:userId',requireSignin,isAuth,isAdmin, (req,res) => {

   res.json({
       user:req.profile
   })
})



router.get("/",);
router.get("/:id");
router.post("/");


module.exports = router;