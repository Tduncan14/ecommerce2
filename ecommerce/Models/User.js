const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const { timeStamp } = require('console');


const UserSchema = new mongoose.Schema({


    name:{
    type:String,
    trim:true,
    required:true,
    maxlength:32},


    email: {
    type:String,
    trim:true,
    required:true,
    unique:32},

    hash_passowrd:{
        type:String,
        required:true
    },

    about:{
        type:String,
        trim:true,
    },
    salt:String,

    role:{
        type:Number,
        default:0
    },

    history:{
        type:Array,
        default:[]
    }

},
{timeStamp:true})