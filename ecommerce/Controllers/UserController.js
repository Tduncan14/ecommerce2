const User = require('../Models/User');



exports.findbyId = ( req,res,next,id) => {


    User.findById(id).exec((err,user) =>{


     if(err || !user){



        return res.status(400).json({
             error:'User not found'
        })
     }


     // setting req.profile to the data coming back
     req.profile = user


       next();

    })

};