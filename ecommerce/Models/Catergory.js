const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuidv1');



const CategorySchema = new mongoose.Schema({

    category:{
        type:String
    }



},{timestamps:true})




module.exports = mongoose.model("Category", CategorySchema)