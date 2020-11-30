const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('require');



const ProductSchema = new mongoose({


    name:{
        Type:String,
        required:true,
        trim:true,
        maxlength:32
    },

    price:{


    }


},
   {timestamps:true}

)




module.exports = mongoose.model("Category", CategorySchema)