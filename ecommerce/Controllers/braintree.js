const User = require('../Models/User');
const braintree = require('braintree');

require('dotenv').config();


BRAINTREE_PUBLIC_KEY=" jxtwyctntjktf69x"
BRAINTREE_PRIVATE_KEY = "aab21dc856ae6c7bd280c6e4368e0662"
BRAINTREE_MERCHANT_ID= "fzsw43wqctch4bmy"



const gateway = new braintree.BraintreeGateway({

    environment : braintree.Environment.Sandbox,
    merchantId :process.env.BRAINTREE_MERCHANT_ID,
    publicKey:process.env.BRAINTREE_PUBLIC_KEY,
    privateKey:process.env.BRAINTREE_PRIVATE_KEY,




})

exports.generateToken = (req,res) => {

 gateway.clientToken.generate({},function(err,response){


 if(err){
     res.status(500).send(err)
 }

 else{
     res.send(response)
 }


 })






}
