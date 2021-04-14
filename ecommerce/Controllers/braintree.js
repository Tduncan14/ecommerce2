const User = require('../Models/User');
const braintree = require('braintree');

require('dotenv').config();


BRAINTREE_PUBLIC_KEY= jxtwyctntjktf69x
BRAINTREE_PRIVATE_KEY = aab21dc856ae6c7bd280c6e4368e0662
BRAINTREE_MERCHANT_ID= fzsw43wqctch4bmy



const gateway = braintree.connect({

    environment : braintree.Environment.Sandbox,
    merchantID :process.env.BRAINTREE_MERCHANT_ID,
    publicKey:process.env.BRAINTREE_PUBLIC_KEY,
    privateKey:process.env.BRAINTREE_PRIVATE_KEY,




})

module.exports = generateToken = (req,res) => {








}

