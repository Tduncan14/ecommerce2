const jwt = require('jsonwebtoken');//generate signed token
const expressJwt = require('express-jwt') // for authroization check
const {errorHandler} = require('../Helpers/Dberror');
const User = require('../Models/User');


exports.signup = (req,res) =>{


  console.log("req.body",req.body)

  const user = new User (req.body)
  

  //  req.name = newUser.name
  //  req.email = newUser.email
  //  req.password = newUser.password


   user.save((err,user)=>{

    if(err){
      return res.status(400).json({
           err:errorHandler(err)
      })

      
    }

    user.salt = undefined;
    user.hashed_password = undefined;

    res.json({

      user,
    })

   })
  

}

// signin method

exports.signin =(req,res) =>{

  // find use based on email
  const {email,password} = req.body
  
  User.findOne({email}, (err,user) =>{

    if(err || !user){
      return res.status(400).json({
        err:"User with that email does not exist. Please sign up"
      })
    }
    

   if(!user.authenicate(password)){
      
    return res.status(401).json({

      error:'Email and password dont match'
    })

 }
  
     const token = jwt.sign({_id: user._id},process.env.JWT_SECRET)


     // PERSIST TOKEN 'T" in cookie expire

     res.cookie('t', token, {expire:new Date() + 9999})

     // return response with user and token to frontend clinet


     const {_id,name,email,role} = user
     
     return res.json({token,user:{_id,email,name,role}})
  })

   // if user is found make sure password and email match

   // create authenica methind in user moder

   // genereate a sign token with user id and secret

   
}

