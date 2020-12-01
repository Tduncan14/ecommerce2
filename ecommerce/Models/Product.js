const mongoose = require('mongoose');

// to connect different documents together

const {ObjectId} = mongoose.Schema;


const ProductSchema = new mongoose.Schema({


name:{
    type:String,
    trim:true,
    required:true,
    maxlength:32
},

description:{
    type:String,
    required:true,
    maxlength:2000
},

price:{
    type:Number,
    required:true,
    default:0,
    maxlength:32
},

category:{
    type:ObjectId,
    ref:'Category',
    maxlength:32
}




},{timestamps:true})




module.exports = mongoose.model('Products',ProductSchema);